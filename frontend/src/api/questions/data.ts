import { questionhttpClient } from "../axios/config";
import { QuestionDTO } from "./dto";
// import { AuthDTO } from "./dto";
// import { UserCredential } from "firebase/auth";

// export const registerUser = (params: AuthDTO) =>
//   httpClient.post<UserCredential>("/signup", params);

// export const signIn = (params: AuthDTO) =>
//   httpClient.post<UserCredential>("/login", params);

// export const signOut = () => httpClient.delete("/logout");

export const getAllQuestions = (token: string) =>
  questionhttpClient.get("/questions", { params: { token: token } });

export const addQuestion = (params: QuestionDTO) =>
  questionhttpClient.post("/questions", params);

export const updateQuestion = (questionId: string, params: QuestionDTO) =>
  questionhttpClient.put(`/questions/${questionId}`, params);

export const deleteQuestion = (questionId: string) =>
  questionhttpClient.delete(`/questions/${questionId}`);
