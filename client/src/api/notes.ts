import { CreateNote, Note, NotesListResponse } from "../types";
import { request } from "./client";

export const NotesApi = {
  // Method: get /notes
  getNotes: (): Promise<NotesListResponse> => {
    return request<NotesListResponse>("/notes", {
      method: "GET",
    });
  },

  //Method: post /notes
  createNote: (data: CreateNote): Promise<Note> => {
    return request<Note>("/notes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
