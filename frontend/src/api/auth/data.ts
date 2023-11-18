import { AuthHttpClient } from "../axios/config";
import { AuthDTO } from "./dto";
import { UserCredential } from "firebase/auth";
import { SignupCredential } from "./model";

export const registerUser = (params: AuthDTO) =>
  AuthHttpClient.post<SignupCredential>("/signup", params);

export const signIn = (params: AuthDTO) =>
  AuthHttpClient.post<UserCredential>("/login", params);

export const signOut = () => AuthHttpClient.delete("/logout");

export const deleteUser = () => AuthHttpClient.delete("/delete");
