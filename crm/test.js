const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const http = require("http");
const ChatService = require('./src/node/services/app/chat.services')

const app = express();
const server = http.createServer(app);
const port = 4003;
const fetch = require("node-fetch");
const path = require("path");

//
var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
  credentials: new AWS.Credentials(
    "AKIAZX32UIF3EVRHQDFU",
    "WTl19C4XCD9NJFfgnNxr7jvCOx+3xCcK71w0/Hf/"
  ),
});

var s3 = new AWS.S3();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Content-Length"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());

app.use("/static", express.static(__dirname + "/"));

app.use("/template/:id", async function (req, res) {
  //return res.sendFile(path.join(__dirname, '/auth.html'));
  //var domain = req.headers.host
  var key = req.params.id;
  var url = key + "/index.html";

  console.log("k", key);

  try {
    var data = await s3
      .getObject({ Bucket: "aythen.template", Key: url })
      .promise();
    //var html = data.Body.toString('utf-8');

    console.log("d", data);

    var base = Buffer.from(
      `<base href="https://s3.eu-central-1.amazonaws.com/aythen.template/${key}/" >`,
      "utf-8"
    );

    var buffer = Buffer.concat([base, data.Body]);

    return res.end(buffer);
  } catch (e) {
    //throw new Error(`Could not retrieve file from S3: ${e.message}`)
    return res.end(e.message);
  }
});

const api = require("./src/node/index.js");
app.use("/", api);


const io = require("socket.io")(server, {
  cors: {
    origin: "https://reseller2.aythen.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

console.log('Has socket');

io.on('connection', (socket) => {
  console.log("==============================");
  console.log("SOCKETIO CONNECTED 3003");
  console.log("==============================");
  
  // socket.on("mensaje", (data) => {
  //   console.log("Mensaje recibido del servidor Socket.io:", data);
  // });

  socket.on('disconnect', () => {
    console.log('Socket.io disconnected!');
  });
});


// RECEIVED FROM WHATSAPP
const VERIFY_TOKEN = "oo-8jAaj6.2yqF@DD0Vp";

function verifyMessageFromWhatsapp(resquest, res) {
  if (
    resquest.query['hub.mode'] == 'subscribe' &&
    resquest.query['hub.verify_token'] == VERIFY_TOKEN) {
    console.log("VERIFY")
    res.send(resquest.query['hub.challenge']);
  } else {
    res.send("No conexion");
  }
}

function receivedMessageFromWhatsapp({ body }, res) {
  const [entry] = body.entry;
  const changes = entry['changes']
  if (!changes.length) return;
  const allChanges = changes.filter((change) => change.field === 'messages')
  allChanges.forEach(async change => {
    const value = change.value
    const metadata = value.metadata
    if (value?.contacts && value?.messages) {
      try {
        const senderPhone = value?.contacts[0]['wa_id'];
  
        const formData = {
          senderPhone: senderPhone,
          receiverPhone: metadata.display_phone_number,
          message: value.messages[0]['text']['body'],
        }
        
        
        const data = await ChatService.saveMessage({
          emitId: null,
          userId: null,
          userPhone: senderPhone,
          message: formData.message,
          emit: {},
          user: {},
          whatsapp: { senderPhone }
        })
        if(data) {
          io.emit("received-message", data); 
        }
      } catch(e) {
        console.log(e)
      }
    }
  })
  res.sendStatus(200)
}



app.get('/webhook', verifyMessageFromWhatsapp);
app.post('/webhook', receivedMessageFromWhatsapp);

server.listen(port, () => {
  console.log("go to http://localhost:" + port);
  console.log('API_URI to https://test-api.aythen.com');
});
