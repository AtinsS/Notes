// src/components/NoteView/NoteView.tsx
import "./NoteView.css";
import type { Note } from "../../types";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Добавляем пропсы onEdit и onDelete
interface NoteViewProps extends Note {
  onEdit?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
}

export const NoteView = ({
  id,
  title,
  text,
  createdAt,
  onEdit,
  onDelete,
}: NoteViewProps) => {
  const handleDelete = () => onDelete?.(id);

  const handleEdit = () => {
    const newText = prompt("Редактировать текст:", text);
    if (newText !== null && newText.trim() !== "") {
      onEdit?.(id, newText);
    }
  };

  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(createdAt)}</p>
        <p className="note-view__title">{title}</p>
      </div>

      <p className="note-view__text">{text}</p>

      <div className="note-view__divider">
        <button
          className="note-view__button note-view__button--delete"
          onClick={handleDelete}
          aria-label="Удалить заметку"
        >
          🗑️
        </button>
        <button
          className="note-view__button note-view__button--edit"
          onClick={handleEdit}
          aria-label="Редактировать заметку"
        >
          ✏️
        </button>
      </div>
    </div>
  );
};
