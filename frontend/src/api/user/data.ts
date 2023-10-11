import {httpClient} from "../axios/config";
import { UserModel } from "./model";

export const createUser = (email: string) =>
  httpClient.post<UserModel>("/user", { email: email });

export const getUser = (email: string) =>
  httpClient.get<UserModel>("/user", { params: { email: email } });
