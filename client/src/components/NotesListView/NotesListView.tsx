import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { Loader } from "../Loader";
import type { NotesListResponse, RequestState } from "../../types";

type NotesListViewProps = {
  notesState: RequestState<NotesListResponse> & {
    refetch: () => Promise<void>;
  };
};

export const NotesListView = ({ notesState }: NotesListViewProps) => {
  switch (notesState.status) {
    case "idle":
      return <div>Ожидание...</div>;

    case "loading":
      return <Loader />;

    case "error":
      return (
        <div className="notes-error">
          <p>Ошибка: {notesState.error.message}</p>
          <button onClick={notesState.refetch}>Повторить</button>
        </div>
      );

    case "success":
      if (notesState.data.list.length === 0) {
        return <div className="notes-empty">Нет заметок</div>;
      }

      return (
        <ul className="note-list-view">
          {notesState.data.list.map((note) => (
            <NoteView key={note.id} {...note} />
          ))}
        </ul>
      );

    default:
      return null;
  }
};
