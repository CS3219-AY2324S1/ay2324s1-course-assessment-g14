export interface UserModel {
  email: string;
  name?: string;
  year?: string;
  major?: string;
  role: string;
  completed: number;
}

export interface Values {
  [key: string]: string | number;
}