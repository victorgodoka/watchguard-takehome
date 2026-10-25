import { Icon } from "@iconify/react";
import { type FormEvent, type MouseEvent, type RefObject, useState } from "react";
import type { ToastType } from "../types/toast";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo";
import { toDateTimeLocal } from "../utils";

type TodoFormComponentProps = {
  ref: RefObject<HTMLDialogElement | null>;
  todo: Todo | null;
  create: (input: CreateTodoInput) => Promise<Todo>;
  update: (id: string, changes: UpdateTodoInput) => Promise<Todo>;
  notify: (message: string, type?: ToastType) => void;
  onClose: () => void;
};

const TodoFormComponent = ({ ref, todo, create, update, notify, onClose }: TodoFormComponentProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loadedTodo, setLoadedTodo] = useState<Todo | null>(null);

  const fill = (todo: Todo | null) => {
    setTitle(todo?.title ?? "");
    setDescription(todo?.description ?? "");
    setDueDate(todo?.due_at != null ? toDateTimeLocal(todo.due_at) : "");
  };

  if (todo !== loadedTodo) {
    setLoadedTodo(todo);
    fill(todo);
  }

  const closeModal = () => ref.current?.close();

  const handleClickOutside = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = {
      title,
      description,
      due_at: dueDate ? new Date(dueDate).getTime() : undefined,
    };

    try {
      if (todo) {
        await update(todo.id, input);
        notify("Task updated successfully!", "success");
      } else {
        await create(input);
        fill(null);
        notify("Task created successfully!", "success");
      }
      closeModal();
    } catch (error: unknown) {
      notify(
        error instanceof Error ? error.message : todo ? "Couldn't update the task." : "Couldn't create the task.",
        "error",
      );
    }
  };

  return (
    <dialog
      ref={ref}
      onClick={handleClickOutside}
      onClose={onClose}
      className="mx-auto h-full w-full items-center justify-center bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex"
    >
      <form onSubmit={handleSubmit} className="relative w-full max-w-xl rounded-md bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-2 right-2 block cursor-pointer rounded-md bg-red-800 p-1.5"
        >
          <Icon icon="material-symbols:close" className="text-white" />
        </button>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            className="w-full border-b border-zinc-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="description" className="font-bold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full border-b border-zinc-300 text-sm text-zinc-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-between">
              <label htmlFor="due_at" className="font-bold">
                Due date
              </label>
              <input
                type="datetime-local"
                id="due_at"
                name="due_at"
                className="w-full border-b border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-700"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-4 w-full cursor-pointer rounded-md bg-cyan-600 py-2 font-bold text-white hover:bg-cyan-500"
        >
          {todo ? "Save changes" : "Create task"}
        </button>
      </form>
    </dialog>
  );
};

export default TodoFormComponent;
