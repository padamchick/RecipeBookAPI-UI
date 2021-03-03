export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  username: string;
  token: string;
  expirationDate: Date;
}


export interface AuthResponseData {
  jwttoken: string;
  username: string;
  expirationDate: string;
  // authorities: string[];
}

export interface UserAccount {
  id: number;
  username: string;
  email: string;
  language: string;
  firstName: string;
  lastName: string;
}
