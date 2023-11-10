import { UserCredential } from "firebase/auth";

export interface SignupCredential {
  user: UserCredential;
  token: string;
}
