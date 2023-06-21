const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = 4004;

const ChatService = require('./src/node/services/app/chat.services');
const socketIo = require("./src/node/socket.js")

// const { Server } = require("socket.io");

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

socketIo.createSocket(server)

const api = require("./src/node/index.js");
app.use("/", api);

const io = socketIo.getSocket()

// const io = new Server(server, {
//   cors: {
//     origin: "*"
//   }
// });

// io.on('connection', (socket) => {
//   console.log("=============================");
//   console.log("Connected socketio");
//   console.log("=============================");
//   socket.on('disconnect', () => {
//     console.log('Socket.io disconnected!');
//   });
// });



// RECEIVED FROM WHATSAPP
const VERIFY_TOKEN = "oo-8jAaj6.2yqF@DD0Vp";

function verifyMessageFromWhatsapp(resquest, res) {
  if (
    resquest.query['hub.mode'] == 'subscribe' &&
    resquest.query['hub.verify_token'] == VERIFY_TOKEN) {
    console.log("VERIFY")
    res.send(resquest.query['hub.challenge']);
  }
  else {
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
    console.log({ metadata })
    if (value?.contacts && value?.messages) {
      try {
        const senderPhone = value?.contacts[0]['wa_id'];
        const fomData = {
          senderPhone: senderPhone,
          receiverPhone: metadata.display_phone_number,
          message: value.messages[0]['text']['body'],
        }
        
        const data = await ChatService.saveMessage({
          emitId: null,
          userId: null,
          userPhone: senderPhone,
          message: fomData.message,
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
  console.log("go to http://localhost:4004" + port);
});
