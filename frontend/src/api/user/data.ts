import { UserHttpClient } from "../axios/config";
import { UserModel, Values } from "./model";

export const createUser = (email: string, token: string) =>
  UserHttpClient.post<UserModel>("/user", { email: email, token: token });

export const getAllAdminUsers = () =>
  UserHttpClient.get<UserModel[]>("/adminusers");

export const getAllNormalUsers = () => UserHttpClient.get<UserModel[]>("/normalusers");
export const createAdminUser = (email: string, token: string) =>
  UserHttpClient.post<UserModel>("/useradmin", { email: email, token: token });

export const getUser = (email: string) =>
  UserHttpClient.get<UserModel>("/user", { params: { email: email } });

export const updateUser = (params: Values) =>
  UserHttpClient.put<UserModel>("/user", { params });

export const deleteActiveUser = (email: string) =>
  UserHttpClient.delete<UserModel>("/user", { params: { email: email } });
