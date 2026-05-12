// src/components/NotesListView/NotesListView.tsx
import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { useFetch } from "../hooks/useFetch";
import { Loader } from "../Loader";
import type { NotesListResponse } from "../../types";
import { AuthApi } from "../../api/auth";

export const NotesListView = () => {
  const { status, data, error, refetch } = useFetch<NotesListResponse>("/notes");

  // --- Логика удаления ---
  const handleDelete = async (id: string) => {
    try {
      await AuthApi.deleteNote(id);
      refetch(); // Перезагружаем список после успеха
    } catch (err) {
      alert("Не удалось удалить заметку. Попробуйте позже.");
      console.error(err);
    }
  };

  // --- Логика редактирования ---
  const handleEdit = async (id: string) => {
    const newText = prompt("Введите новый текст:");
    if (!newText || newText.trim() === "") return;

    try {
      // Отправляем только измененное поле (или весь объект, зависит от бэкенда)
      await AuthApi.reductNote(id, { text: newText });
      refetch(); // Перезагружаем список
    } catch (err) {
      alert("Не удалось сохранить изменения.");
      console.error(err);
    }
  };

  switch (status) {
    case "idle":
      return <div>Ожидание...</div>;
    case "loading":
      return <Loader />;
    case "error":
      return (
        <div className="notes-error">
          <p>Ошибка: {error.message}</p>
          <button onClick={refetch}>Повторить</button>
        </div>
      );
    case "success":
      if (data.list.length === 0) {
        return <div className="notes-empty">Нет заметок</div>;
      }
      return (
        <ul className="note-list-view">
          {data.list.map((note) => (
            <NoteView 
              key={note.id} 
              {...note} 
              onDelete={handleDelete} // Пробрасываем обработчик
              onEdit={handleEdit}     // Пробрасываем обработчик
            />
          ))}
        </ul>
      );
    default:
      return null;
  }
};