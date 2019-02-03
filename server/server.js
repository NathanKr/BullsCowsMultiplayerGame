const constants = require("./constans");
const utils = require("./utils");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");

app.use(express.static(path.join(__dirname, "../") + "/public"));

const socketIo = require("socket.io");
const io = socketIo(server);
const { messages, admin } = constants;
const { newMessage, joinRoom, createMessage } = messages;

// --- client was connected
io.on("connect", socket => {
  console.log(`server got new connection. socket id : ${socket.id}`);
  // --- send on connect to this client
  socket.emit(
    newMessage,
    utils.createMessage(admin, "Welcome to the chat room")
  );

  // --- respond to joinRoom event from client
  socket.on(joinRoom, ({ room }, ackCallback) => {
    console.log(`got event from client joinRoom. room : ${room}`);
    socket.join(room); // --- this socket is attached to room

    // --- send on connect to all in this room beside this client
    socket.broadcast
      .to(room)
      .emit(
        newMessage,
        utils.createMessage(admin, "New user entered the chat room")
      );

    // --- respond to createMessage event from client
    socket.on(createMessage, ({ from, text }, ackCallback) => {
      console.log(
        `got event from client ${createMessage}. from : ${from} , text : ${text}`
      );

      // --- send to all client beside the one that send it
      socket.broadcast.to(room).emit(newMessage, { from, text });
      ackCallback("this is server ack");
    });

    // --- respond to disconnect after client is closed
    socket.on("disconnect", () => {
      // --- send on connect to all beside this client
      socket.broadcast
        .to(room)
        .emit(
          newMessage,
          utils.createMessage(admin, "User has exit the chat room")
        );
    });

    ackCallback("this is server ack");
  });
});

server.listen(port, () => console.log(`app is listening on port : ${port}`));
