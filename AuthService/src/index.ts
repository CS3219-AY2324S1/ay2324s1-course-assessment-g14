import express from "express";
import cors from "cors";
import {
  handleLogin,
  handleLogout,
  handleSignUp,
} from "./auth/auth.controller";
// import { Socket, Server } from 'socket.io';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { firebaseConfig } from "./firebase/firebase.config";
// import { Server as ServerHttp } from 'http';

const app = express();
const port = 3003;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
app.delete("/logout", handleLogout);



// httpServer.listen(socketPort, () => {
//   console.log(`socket listening on port ${socketPort}`);
// });

app.listen(port, () => {
  console.log(`Auth Service listening on port ${port}`);
});
