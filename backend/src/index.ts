import express from "express";
import cors from "cors";
import {
  handleLogin,
  handleLogout,
  handleSignUp,
} from "./auth/auth.controller";
import { handleCreateUser, handleGetUser } from "./user/user.controller";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "./firebase/firebase.config";
import { initializeMatchingService } from './matching/matching.service'; // Import the matching service function
import { Socket, Server } from 'socket.io';
import { Server as ServerHttp } from 'http';
import { handleCreateUser, handleGetUser, handleUpdateUser } from "./user/user.controller";
const app = express();
const port = 3001;
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

app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
app.delete("/logout", handleLogout);

app.post("/user", handleCreateUser);
app.get("/user", handleGetUser);
app.put("/user", handleUpdateUser);

//Socket logic
// Maintain an array to store active users seeking a match
const activeUsers: { socket: Socket; preferences: any }[] = [];

// Initialize the matching service by passing the io object
initializeMatchingService(io);

// httpServer.listen(socketPort, () => {
//   console.log(`socket listening on port ${socketPort}`);
// });

httpServer.listen(port, () => {
  console.log(`Peerprep listening on port ${port}`);
});
