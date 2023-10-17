import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';



const chatApp = express();
chatApp.use(cors({
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true
}));

const chatServer = createServer(chatApp);
const chatWss = new WebSocketServer({ server: chatServer });

// Handle WebSocket connections and chat logic here

chatServer.listen(3007, () => {
  console.log('Chat WebSocket server listening on port 3007');
});