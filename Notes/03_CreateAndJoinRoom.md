1. How to create a room?
2. How to join a room?
3. How to set room size?

index.js and script.js ki need hogi.

#### script.js
```javascript
var socket = io.connect('localhost:4040');

var videoChatForm = document.getElementById('video-chat-form')
var videoChatRooms = document.getElementById('video-chat-rooms')

var joinBtn = document.getElementById('join');
var roomName = document.getElementById('roomName');
var userVideo = document.getElementById('user-video')
var peerVideo = document.getElementById('peer-video')

// jab join button click hoga to ye function run hoga.
joinBtn.addEventListener("click", function () {
  if (roomName.value == "") {
    alert('Please Enter a room name:');
  }
  else {
    // ik event create kiya gaya hai join name se. or jab rvent create hoga to ham kuch value yaha se pass kare ge 'roomName.value' ke through
    socket.emit("join", roomName.value);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia(
      {
        audio: true,
        video: { with: 1280, height: 720 }
      },
      //IS FUNCTION ME VIDEO STREAMMIN  G KA FUNCTION WRITE HOTA HAI (stream) ke jagah kuch v paas kar sakte hai.

      function (stream) {
        videoChatForm.style = "display:none";
        userVideo.srcObject = stream;
        userVideo.onloadedmetadata = function (e) {
          userVideo.play(); //always play fruction
        }
      },
      function (error) {
        //Error Handling....
        alert("Something bad happened You cant access yhe media Because of :" + error)
      }
    );
  }
})

```

#### index.js
```javascript
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
      console.log('Room Created');
    }
    else if (room.size == 1) {
      socket.join(roomName);
    } else {
      console.log("Room Full Now")
    }
    console.log(room);
  });
});
```