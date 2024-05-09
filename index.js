const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(4040, () => {
  console.log(`SERVER : http://localhost:4040`);
});


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting view middleware
app.set('view engine', 'ejs');
app.set('views', './views');

//public folder ko static bana diya 
app.use(express.static('public'));

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);


// socket io working with signaling server
var io = socket(server);
io.on("connection", function (socket) {
  console.log("User Connected:" + socket.id);

  socket.on("join", function (roomName) {
    var rooms = io.sockets.adapter.rooms;
    console.log(rooms);

    var room = rooms.get(roomName);
    console.log(room);
    if (room == undefined) {
      // ye line room create kar raha hai
      socket.join(roomName);
      //jab room created hoga to ik event create hoga 
      socket.emit("created")
      console.log('Room Created');
    }
    else if (room.size == 1) {
      socket.join(roomName);
      socket.emit("joined");

    } else {
      console.log("Room Full Now")
      socket.emit("full")
    }
    console.log(room);
  });

  //jab server ready hoga to roomName aayega
  socket.on('ready', function (roomName) {
    console.log("ready");
    socket.broadcast.to(roomName).emit("ready");//client side par catch hoga "ready"
  });

  //ik particular port par ice-candidate par 
  socket.on("candidate", function (candidate, roomName) {
    console.log("candidate");
    socket.broadcast.to(roomName).emit("candidate", candidate);
  });

  //offer create karege
  socket.on("offer", function (offer, roomName) {
    console.log("offer");
    socket.broadcast.to(roomName).emit("offer", offer)
  })

  //offer create ke baad answer create karehe
  socket.on("answer", function (offer, roomName) {
    console.log("offer");
    socket.broadcast.to(roomName).emit("answer", answer);
  });

  //
});