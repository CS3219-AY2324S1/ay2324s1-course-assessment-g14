import httpClient from "../axios/config";
import { QuestionDTO } from "./dto";
// import { AuthDTO } from "./dto";
// import { UserCredential } from "firebase/auth";

// export const registerUser = (params: AuthDTO) =>
//   httpClient.post<UserCredential>("/signup", params);

// export const signIn = (params: AuthDTO) =>
//   httpClient.post<UserCredential>("/login", params);

// export const signOut = () => httpClient.delete("/logout");

export const getAllQuestions = () => httpClient.get("/questions");

export const addQuestion = (params: QuestionDTO) =>
  httpClient.post("/questions", params);

export const deleteQuestion = (params: string) =>
  httpClient.delete("/questions/:questionId");
