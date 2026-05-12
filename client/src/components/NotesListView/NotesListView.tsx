// src/components/NotesListView/NotesListView.tsx
import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { Loader } from "../Loader";
import type { NotesListResponse, RequestState } from "../../types";
import { AuthApi } from "../../api/auth";

type NotesListViewProps = {
  notesState: RequestState<NotesListResponse> & { refetch: () => void };
};

export const NotesListView = ({ notesState }: NotesListViewProps) => {
  const { status, refetch } = notesState;

  const handleDelete = async (id: string) => {
    try {
      await AuthApi.deleteNote(id);
      refetch();
    } catch (err) {
      alert("Не удалось удалить заметку. Попробуйте позже.");
      console.error(err);
    }
  };

  const handleEdit = async (id: string, newText: string) => {
    try {
      await AuthApi.reductNote(id, { text: newText });
      refetch();
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
          <p>Ошибка: {notesState.error.message}</p>
          <button onClick={refetch}>Повторить</button>
        </div>
      );
    case "success":
      if (notesState.data.list.length === 0) {
        return <div className="notes-empty">Нет заметок</div>;
      }

      return (
        <ul className="note-list-view">
          {notesState.data.list.map((note) => (
            <NoteView
              key={note.id}
              {...note}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      );
    default:
      return null;
  }
};
