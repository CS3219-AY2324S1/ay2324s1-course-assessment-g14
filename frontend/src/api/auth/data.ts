import httpClient from "../axios/config";
import { AuthDTO } from "./dto";
import { UserCredential } from "firebase/auth";

export const registerUser = (params: AuthDTO) =>
  httpClient.post<UserCredential>("/signup", params);

export const signIn = (params: AuthDTO) =>
  httpClient.post<UserCredential>("/login", params);

export const signOut = () => httpClient.delete("/logout");
