import express from "express";
import cors from "cors";
import { handleLogin } from "./auth/auth.controller";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", handleLogin);

app.listen(port, () => {
  console.log(`Peerprep listening on port ${port}`);
});
