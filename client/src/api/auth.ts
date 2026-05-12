import { request } from "./client";
import {
  AuthResponse,
  CreateNote,
  Login,
  Note,
  Register,
  User,
} from "../types";

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

  //method delete notes
  deleteNote: (id: string): Promise<void> => {
    return request<void>(`/notes/${id}`, { method: "DELETE" });
  },

  //method put notes
  reductNote: (id: string, data: Partial<CreateNote>): Promise<Note> => {
    return request<Note>(`/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
