import express from "express";
import cors from "cors";

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { firebaseConfig } from "./firebase/firebase.config";
// import { Socket, Server } from 'socket.io';
// import { Server as ServerHttp } from 'http';

import { handleCreateUser, handleGetUser, handleUpdateUser, handleCreateAdminUser } from "./user/user.controller";
const app = express();
const port = 3004;
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Initialize Firebase Firestore and other configurations here
// initializeApp(firebaseConfig);
// const db = getFirestore();

app.post("/user", handleCreateUser);
app.post("/useradmin", handleCreateAdminUser);
app.get("/user", handleGetUser);
app.put("/user", handleUpdateUser);




// httpServer.listen(socketPort, () => {
//   console.log(`socket listening on port ${socketPort}`);
// });

app.listen(port, () => {
  console.log(`User Service listening on port ${port}`);
});
