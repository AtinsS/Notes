import { request } from "./client";
import { AuthResponse, Login, Register, User } from "../types";

export const AuthApi = {
  //Method:post /login
  login: (data: Login): Promise<AuthResponse> => {
    return request<AuthResponse>("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  //Method:post /register
  register: (data: Register): Promise<AuthResponse> => {
    return request<AuthResponse>("/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  //Method:post /logout
  logout: (): Promise<void> => {
    return request<void>("/logout", {
      method: "POST",
    });
  },

  //method: get /users/me
  getCurrentUser: (): Promise<User> => {
    return request<User>("/users/me");
  },
};
