import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email("Некорректный email"),
  username: z.string().min(5, "Минимум 5 символов"),
});

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string().min(5, "Минимум 5 символов"),
  text: z
    .string()
    .min(10, "Минимум 10 символов")
    .max(300, "Максимум 300 символов"),
  userId: z.string(),
  createdAt: z.number(),
});

export const CreateNoteSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов"),
  text: z
    .string()
    .min(10, "Минимум 10 символов")
    .max(300, "Максимум 300 символов"),
});

export const LoginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Минимум 8 символов"),
});

export const RegisterSchema = z.object({
  username: z.string().min(5, "Минимум 5 символов"),
  email: z.string().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .regex(/[A-Z]/, "Нужна хотя бы одна заглавная буква")
    .regex(/[a-z]/, "Нужна хотя бы одна строчная буква")
    .regex(/[0-9]/, "Нужна хотя бы одна цифра")
    .regex(/[^A-Za-z0-9]/, "Нужен спецсимвол"),
});

export type User = z.infer<typeof UserSchema>;
export type Note = z.infer<typeof NoteSchema>;
export type CreateNote = z.infer<typeof CreateNoteSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;

export type AuthResponse = User;

export type NotesListResponse = {
  list: Note[];
  pageCount: number;
};

export type ApiError = {
  message: string;
};

export type RequestState<Data, Err = ApiError> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Data }
  | { status: "error"; error: Err };
