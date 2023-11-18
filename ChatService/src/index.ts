import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const chatApp = express();
chatApp.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type",
    credentials: true,
  })
);

const chatServer = createServer(chatApp);

const io = new Server(chatServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a specific room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle sending of messages
  socket.on("sendMessage", (roomId, message) => {
    // Broadcast the message to everyone else in the room
    socket.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

chatServer.listen(3007, () => {
  console.log("Chat WebSocket server with socket.io listening on port 3007");
});
