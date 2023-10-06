import express from "express";
import cors from "cors";
import {
  handleLogin,
  handleLogout,
  handleSignUp,
} from "./auth/auth.controller";
import { handleCreateUser, handleGetUser } from "./user/user.controller";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
app.delete("/logout", handleLogout);

app.post("/user", handleCreateUser);
app.get("/user", handleGetUser);

app.listen(port, () => {
  console.log(`Peerprep listening on port ${port}`);
});
