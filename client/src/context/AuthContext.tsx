import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, Login, Register } from "../types";
import { AuthApi } from "../api/auth";

/**
 * Типизация контекста
 */
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: Login) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: Register) => Promise<void>;
}

/**
 * Создаем контекст
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Кастомный хук для использования контекста
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};

/**
 * Провайдер
 */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Обработка ошибок авторизации
   */

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const checkedUser = await AuthApi.getCurrentUser();
        if (isMounted) {
          setUser(checkedUser);
        }
      } catch (error) {
        console.error("Ошибка авторизации:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Функция для входа в систему
   */
  const login = async (data: Login) => {
    const userLogin = await AuthApi.login(data);
    setUser(userLogin);
  };

  /**
   * Функция для выхода из системы
   */
  const logout = async () => {
    await AuthApi.logout();
    setUser(null);
  };

  /**
   * Функция для регистрации в системе
   */
  const register = async (data: Register) => {
    const userRegister= await AuthApi.register(data);
    setUser(userRegister);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
