import express from "express";
import cors from "cors";
import {
  handleLogin,
  handleLogout,
  handleSignUp,
  handleDelete,
} from "./auth/auth.controller";

const app = express();
const port = 3003;
app.use(cors());
app.use(express.json());

app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
app.delete("/logout", handleLogout);
app.delete("/delete", handleDelete);

app.listen(port, () => {
  console.log(`Auth Service listening on port ${port}`);
});
