import {UserHttpClient} from "../axios/config";
import { UserModel, Values } from "./model";


export const createUser = (email: string) =>
  UserHttpClient.post<UserModel>("/user", { email: email });

export const getUser = (email: string) =>
  UserHttpClient.get<UserModel>("/user", { params: { email: email } });

  export const updateUser = (params: Values) =>
  UserHttpClient.put<UserModel>("/user", { params });