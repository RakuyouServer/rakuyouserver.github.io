export interface AccessTokenEntity {
  value: string;
  exp: number;
}

export interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
  remember: boolean;
}

export interface RegisterForm {
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}