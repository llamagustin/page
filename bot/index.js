const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const ExcelService = require('./node/excel')
const GPTService = require('./node/gpt')
const WatshappService = require('./node/whatsapp')

const Bree = require('bree');



const http = require('http')

const app = express()
const server = http.createServer(app)
const port = 4010;
// const fetch = require('node-fetch');
const path = require("path");
// const { Server } = require("socket.io");

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Content-Length');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
});

app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());




/******************************************/

app.use('/excel', ExcelService)


/******************************************/
// app.use('', (req, res) => {
  
//   /*
//   poner el aythen web aqui
//   */
//   console.log('weifjwi')
//   return res.send('mantainment ' + new Date() )
// });

app.get('/test', (req, res) => {
  return res.send('mantainment ' + new Date() )
});


server.listen(port, () => {
  console.log('go to http://localhost:' + port);
});



// const io = require("socket.io")(server, {
//   cors: {
//     origin: "https://dev-bot.aythen.com",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     withCredentials: true
//   }
// });


// io.on('connection', (socket) => {
//   console.log("==============================");
//   console.log("SOCKETIO CONNECTED BOT");
//   console.log("==============================");
  
//   // socket.on("mensaje", (data) => {
//   //   console.log("Mensaje recibido del servidor Socket.io:", data);
//   // });

//   socket.on('disconnect', () => {
//     console.log('Socket.io disconnected!');
//   });
// });



const bree = new Bree({
  jobs: [
    // {
    //   name: 'task developer',
    //   interval: '10m',
    //   path: path.join(__dirname, 'jobs', 'mytask.js')
    // },
    {
      name: 'task reseller',
      interval: '15s',
      path: path.join(__dirname, 'jobs', 'task-reseller.js')
    }
  ]
});

bree.start();


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
  
  console.log('mensaje entrante')
  
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
        
        
        console.log('recived: ', formData)
      } catch(e) {
        console.log(e)
      }
    }
  })
  res.sendStatus(200)
}



app.get('/webhook', verifyMessageFromWhatsapp);
app.post('/webhook', receivedMessageFromWhatsapp);
