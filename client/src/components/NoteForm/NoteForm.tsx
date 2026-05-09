import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { CreateNote, CreateNoteSchema } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../Loader";
import { NotesApi } from "../../api/notes";

export const NoteForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNote>({
    resolver: zodResolver(CreateNoteSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateNote) => {
    try {
      await NotesApi.createNote(data);
      console.log("Заметка успешно создана");

      reset();
      onSuccess?.();
    } catch (error: unknown) {
      setError("root", {
        type: "server",
        message: (error as Error).message || "Не удалось сохранить заметку",
      });
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Заголовок">
        <input type="text" {...register("title")} />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </FormField>
      <FormField label="Текст">
        <textarea  {...register("text")} />
        {errors.text && <span className="error">{errors.text.message}</span>}
      </FormField>
      <Button type="submit" isDisabled={isSubmitting}>
        {isSubmitting ? <Loader /> : "Сохранить"}
      </Button>
    </form>
  );
};
