import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../FormField";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { useAuth } from "../../context/AuthContext";

import { RegisterSchema, Register } from "../../types";

import "./RegisterForm.css";
import "../../errors.css";

export const RegisterForm = () => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Register) => {
    try {
      await registerUser(data);
      console.log("Регистрация через форму успешно завершена");
    } catch (error: unknown) {
      setError("root", {
        message: (error as Error).message || "Не удалось зарегистрироваться",
      });
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <div className="server-error">{errors.root.message}</div>}

      <FormField label="Имя">
        <input {...register("username")} />
        {errors.username && (
          <div className="error">{errors.username.message}</div>
        )}
      </FormField>
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
        {isSubmitting ? <Loader /> : "Зарегистрироваться"}
      </Button>
    </form>
  );
};
