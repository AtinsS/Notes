import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { usersRouter, notesRouter, authRouter } from "./routes";

import { sleep } from "./sleep.js";

const server = express();

server.listen(4000, () => {
  console.log("Сервер запущен на порту 4000");
});

server.use(
  json(),
  cookieParser(),
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
  sleep([400, 1500]),
);

server.use("/users", usersRouter);

server.use("/notes", notesRouter);

server.use("/", authRouter);
