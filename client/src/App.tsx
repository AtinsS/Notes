import "./App.css";
import { useState } from "react";
import { AuthApi } from "./api/auth";
import { AuthForm } from "./components/AuthForm";
import { useFetch } from "./components/hooks/useFetch";
import { Loader } from "./components/Loader";
import { ModalReductNote } from "./components/NoteView/ModalReductNote";
import { LogoutButton } from "./components/LogoutButton";
import { NoteForm } from "./components/NoteForm";
import { NotesListView } from "./components/NotesListView";
import { UserView } from "./components/UserView";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { Note, NotesListResponse } from "./types";

const NotesSection = () => {
  const notesState = useFetch<NotesListResponse>("/notes");
  const [editingNote, setEditingNote] = useState<
    Pick<Note, "id" | "title" | "text"> | null
  >(null);

  const handleEditNote = (id: string, title: string, text: string) => {
    setEditingNote({ id, title, text });
  };

  const handleSaveNote = async (title: string, text: string) => {
    if (!editingNote) {
      return;
    }

    try {
      await AuthApi.reductNote(editingNote.id, { title, text });
      setEditingNote(null);
      notesState.refetch();
    } catch (err) {
      alert("Не удалось сохранить изменения.");
      console.error(err);
    }
  };

  return (
    <div className="content">
      <div className="note-form">
        <NoteForm onSuccess={notesState.refetch} />
      </div>
      {editingNote && (
        <div className="note-edit-modal">
          <ModalReductNote
            title={editingNote.title}
            text={editingNote.text}
            onClose={() => setEditingNote(null)}
            onSave={handleSaveNote}
          />
        </div>
      )}
      <div className="notes-list">
        <NotesListView notesState={notesState} onEditNote={handleEditNote} />
      </div>
    </div>
  );
};

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  if (user) {
    return (
      <div className="app">
        <div className="header">
          <UserView />
          <LogoutButton />
        </div>
        <NotesSection />
      </div>
    );
  }

  return (
    <div className="app">
      <AuthForm />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
