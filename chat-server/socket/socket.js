const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

// we create a http server for the express app
const server = http.createServer(app);

// we wrap the express server inside the web-socket
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// we keep a map of users connected inorder to see which users are online and which are offline
const userSocketMap = {}; // {userId: socketId} -> format

// creating a function to obtain the socketId of a particular receiver
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// this is how we establish a connection in websocket
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  //   this is how we extract the data send from the socket.io-client
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //   after adding the userId to the userSocketMap we send an event to all the connected clients indicating
  // the updated online users list
  //   io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // sends a list of the userId that are online

  //   socket.on() is used to listen to the events. can be used on both client and server sides
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);

    // once we disconnect we delete the userId from the userSocketMap and then emit an event to alert all the clients, regarding the online status
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
