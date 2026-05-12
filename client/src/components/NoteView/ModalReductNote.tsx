import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type ModalReductNoteProps = {
  title: string;
  text: string;
  onClose: () => void;
  onSave: (title: string, text: string) => void;
};

export const ModalReductNote = ({
  title,
  text,
  onClose,
  onSave,
}: ModalReductNoteProps) => {
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftText, setDraftText] = useState(text);

  const isDisabled =
    draftTitle.trim().length === 0 || draftText.trim().length < 10;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    onSave(draftTitle.trim(), draftText.trim());
  };

  return (
    <div className="note-modal" role="presentation" onMouseDown={onClose}>
      <form
        className="note-modal__content"
        aria-label="Редактировать заметку"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="note-modal__header">
          <h2 className="note-modal__title">Редактировать заметку</h2>
        </div>

        <label className="note-modal__field">
          <span>Заголовок</span>
          <input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            autoFocus
          />
        </label>

        <label className="note-modal__field">
          <span>Текст</span>
          <textarea
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
          />
        </label>

        <div className="note-modal__actions">
          <button
            className="note-modal__button"
            type="button"
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            className="note-modal__button note-modal__button--primary"
            type="submit"
            disabled={isDisabled}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};
