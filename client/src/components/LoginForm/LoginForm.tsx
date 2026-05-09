import "./LoginForm.css";
import "../../errors.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../types";
import { Login } from "../../types";
import { Loader } from "../Loader";
import { useAuth } from "../../context/AuthContext";

export const LoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Login) => {
    try {
      await login(data);
      console.log("Логин через форму успешно завершен");
    } catch (error: unknown) {
      setError("root", {
        type: "server",
        message: (error as Error).message || "Не удалось авторизоваться",
      });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <div className="server-error">{errors.root.message}</div>}

      <FormField label="Email">
        <input {...register("email")} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </FormField>
      <FormField label="Пароль">
        <input {...register("password")} type="password" />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </FormField>
      <Button type="submit" isDisabled={isSubmitting}>
        {isSubmitting ? <Loader /> : "Войти"}
      </Button>
    </form>
  );
};
