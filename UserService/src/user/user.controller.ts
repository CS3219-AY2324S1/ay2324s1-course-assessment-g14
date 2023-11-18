import { Request, Response } from "express";

import {
  createAdminUser,
  delUser,
  createUser,
  getAdminUsers,
  getUser,
  updateUser,
  getNormalUsers
} from "./user.service";

export async function handleCreateUser(req: Request, res: Response) {
  try {
    const { email, token } = req.body;
    console.log(`creating user ${email}`);
    const user = await createUser(email, token);
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleCreateAdminUser(req: Request, res: Response) {
  try {
    const { email, token } = req.body;
    console.log(`creating admin user ${email}`);
    const user = await createAdminUser(email, token);
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleGetUser(req: Request, res: Response) {
  try {
    console.log(req.query.email);
    const { email } = req.query;
    console.log(`getting user ${email}`);
    if (typeof email === "string") {
      const user = await getUser(email);

      res.status(200).send(user);
    } else {
      res.status(500).send("no params");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleGetAdminUsers(req: Request, res: Response) {
  try {
    console.log(`getting admin users`);
    const result = await getAdminUsers();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleGetNormalUsers(req: Request, res: Response) {
  try {
    console.log(`getting normal users`);
    const result = await getNormalUsers();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleUpdateUser(req: Request, res: Response) {
  try {
    const email = req.body.params.email;
    if (typeof email === "string") {
      console.log(`updating user ${email}`);
      const user = await updateUser(email, req.body.params);
      res.status(200).send(user);
    } else {
      res.status(500).send("no params");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function handleDeleteUser(req: Request, res: Response) {
  try {
    const user = req.query;
    if (user && typeof user.email === "string") {
      console.log(`deleting user`);
      await delUser(user.email);
      res.status(200).send("no params");
    } else {
      res.status(500).send("no params");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
