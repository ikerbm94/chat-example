
// emit을 하면 on으로 받는다는 건가?
// 언제 socket이고 언제 io인가?
// connection과 disconnet 같은 경우는 내장되어있는 객체들인가?

// app을 http서버에서 실행
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// URL'/'에 대한 요청으로 app에서는 다음과 같은 응답을 보낸다
// __dirname은 현재 실행중인 파일경로
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  // 연결을 성공시키면 a user connected 출력
  console.log('a user connected');

  // 연결이 끊기면 user disconnected 출력
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket에 chat message라는 변수에 값이 들어오면 (변수명은 msg) 
  socket.on('chat message', (msg) => {

    // 넘어온 value값을 출력하고
    console.log('message: ' + msg);

    // io.emit()으로 채팅방 전원에게 전송
    io.emit('chat message', msg);

    // socket.broadcast.emit()으로 송신자를 제외한 채팅방 전원에게 전송
    // socket.broadcast.emit('chat message', msg);

  });

});

// 서버는 포트 3000번에 띄운다 (localhost:3000)
server.listen(3000, () => {
  console.log('listening on *:3000');
});