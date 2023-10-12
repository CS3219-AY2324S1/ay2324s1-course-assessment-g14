import express from "express";
import cors from "cors";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "./firebase/firebase.config";
import { initializeMatchingService } from './matching/matching.service'; // Import the matching service function
import { Socket, Server } from 'socket.io';
import { Server as ServerHttp } from 'http';

const app = express();
const port = 3005;
app.use(cors());
app.use(express.json());

const httpServer = new ServerHttp(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
}); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Initialize Firebase Firestore and other configurations here
initializeApp(firebaseConfig);
const db = getFirestore();


//Socket logic
// Maintain an array to store active users seeking a match
const activeUsers: { socket: Socket; preferences: any }[] = [];

// Initialize the matching service by passing the io object
initializeMatchingService(io);

// httpServer.listen(socketPort, () => {
//   console.log(`socket listening on port ${socketPort}`);
// });

httpServer.listen(port, () => {
  console.log(`Matching Service listening on port ${port}`);
});
