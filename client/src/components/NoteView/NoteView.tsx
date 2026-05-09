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

export const NoteView = ({ title, text, createdAt }: Note) => {
  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(createdAt)}</p>
        <p className="note-view__title">{title}</p>
      </div>

      <p className="note-view__text">{text}</p>
      <div className="note-view__divider">
        <button className="note-view__button note-view__button--delete">
          🗑️
        </button>
        <button className="note-view__button note-view__button--edit">
          ✏️
        </button>
      </div>
    </div>
  );
};
