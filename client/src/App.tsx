import "./App.css";
import { AuthForm } from "./components/AuthForm";
import { useFetch } from "./components/hooks/useFetch";
import { Loader } from "./components/Loader";
import { LogoutButton } from "./components/LogoutButton";
import { NoteForm } from "./components/NoteForm";
import { NotesListView } from "./components/NotesListView";
import { UserView } from "./components/UserView";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { NotesListResponse } from "./types";

const NotesSection = () => {
  const notesState = useFetch<NotesListResponse>("/notes");

  return (
    <div className="content">
      <div className="note-form">
        <NoteForm onSuccess={notesState.refetch} />
      </div>
      <div className="notes-list">
        <NotesListView notesState={notesState} />
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
