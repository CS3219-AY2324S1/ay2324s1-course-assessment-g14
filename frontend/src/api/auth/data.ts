import { AuthHttpClient } from "../axios/config";
import { AuthDTO } from "./dto";
import { UserCredential } from "firebase/auth";

export const registerUser = (params: AuthDTO) =>
  AuthHttpClient.post<UserCredential>("/signup", params);

export const signIn = (params: AuthDTO) =>
  AuthHttpClient.post<UserCredential>("/login", params);

export const signOut = () => AuthHttpClient.delete("/logout");

export const deleteUser = () => AuthHttpClient.delete("/delete");
