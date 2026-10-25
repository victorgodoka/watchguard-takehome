import { useRef, useState } from "react";
import type { Todo } from "../types/todo";

export function useTodoModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState<Todo | null>(null);

  const open = (todo: Todo | null = null) => {
    setEditing(todo);
    ref.current?.showModal();
  };

  const reset = () => {
    if (!ref.current?.open) setEditing(null);
  };

  return { ref, editing, open, reset };
}
