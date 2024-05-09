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
