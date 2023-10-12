import { Request, Response } from "express";
import { signUp, login, logout } from "./auth.service";

export async function handleSignUp(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log(`signing up new user ${email}`);
    const signedUp = await signUp(email, password);
    res.status(200).send(signedUp);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log(`logging in user ${email}`);
    const loggedIn = await login(email, password);
    res.status(200).send(loggedIn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleLogout(req: Request, res: Response) {
  try {
    console.log(`logging out`);
    await logout();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
