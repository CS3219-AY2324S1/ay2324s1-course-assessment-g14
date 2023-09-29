import { Request, Response } from "express";
import { signUp, login, currentUser, logout } from "./auth.service";

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const loggedIn = await login(email, password);
    res.send(loggedIn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
