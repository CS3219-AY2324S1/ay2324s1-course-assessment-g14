import express from "express";
import cors from "cors";

import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
  handleCreateAdminUser,
  handleGetAdminUsers,
} from "./user/user.controller";
const app = express();
const port = 3004;
app.use(cors());
app.use(express.json());

app.post("/user", handleCreateUser);
app.get("/adminusers", handleGetAdminUsers);
app.post("/useradmin", handleCreateAdminUser);
app.get("/user", handleGetUser);
app.put("/user", handleUpdateUser);
app.delete("/user", handleDeleteUser);

app.listen(port, () => {
  console.log(`User Service listening on port ${port}`);
});
