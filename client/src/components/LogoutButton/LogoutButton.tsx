import { Button } from "../Button";
import "./LogoutButton.css";
import { useAuth } from "../../context/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = logout;

  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};
