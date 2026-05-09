import { useAuth } from "../../context/AuthContext";
import "./UserView.css";

export const UserView = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const username = user.username;

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
