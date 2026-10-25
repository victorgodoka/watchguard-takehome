import { Icon } from "@iconify/react";
import type { Todo } from "../types/todo";
import { isOverdue } from "../utils";
import TodoDate from "./todo-date.component";
import TodoPill from "./todo-pill.component";

type TodoComponentProps = {
  todo: Todo;
  editToDo: (todo: Todo) => void;
  deleteToDo: (id: string) => void;
  toggleCompleteToDo: (todo: Todo) => void;
};

const TodoComponent = ({ todo, editToDo, deleteToDo, toggleCompleteToDo }: TodoComponentProps) => {
  const { title, description, completed, created_at, completed_at, due_at } = todo;
  const overdue = isOverdue(completed, due_at);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) deleteToDo(todo.id);
  };

  return (
    <div className="flex items-stretch">
      <div className="flex-1 bg-zinc-200 p-4">
        <div className="flex w-full items-start justify-between gap-2">
          <div>
            <p className="text-xl font-bold">{title}</p>
            {description && <p className="text-sm text-zinc-800 italic">{description}</p>}
          </div>

          {completed ? (
            <TodoPill
              colorClass="bg-green-600 border-green-400"
              label="Completed"
              icon="material-symbols:check-circle-outline"
            />
          ) : overdue ? (
            <TodoPill
              colorClass="bg-red-600 border-red-400"
              label="Overdue"
              icon="material-symbols:warning-outline"
            />
          ) : null}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-end gap-4">
          <TodoDate date={created_at} label="Created" icon="material-symbols:calendar-today-outline" />

          {completed
            ? completed_at != null && (
                <TodoDate date={completed_at} label="Completed" icon="material-symbols:check-circle-outline" />
              )
            : due_at != null && <TodoDate date={due_at} label="Due" icon="material-symbols:event-outline" />}
        </div>
      </div>

      <div className="grid grid-rows-3">
        {completed 
          ? <button
            type="button"
            onClick={() => toggleCompleteToDo(todo)}
            aria-label="Edit task"
            className="flex cursor-pointer items-center justify-center px-3 bg-orange-600"
          >
            <Icon icon="pajamas:redo" className="text-2xl text-white" />
          </button>
          : <button
            type="button"
            onClick={() => toggleCompleteToDo(todo)}
            aria-label="Edit task"
            className="flex cursor-pointer items-center justify-center px-3 bg-green-600"
          >
            <Icon icon="material-symbols:library-add-check-rounded" className="text-2xl text-white" />
          </button>
        }
        <button
          type="button"
          onClick={() => editToDo(todo)}
          aria-label="Edit task"
          className="flex cursor-pointer items-center justify-center px-3 bg-cyan-600"
        >
          <Icon icon="material-symbols:edit" className="text-2xl text-white" />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete task"
          className="flex cursor-pointer items-center justify-center px-3 bg-red-600"
        >
          <Icon icon="material-symbols:delete" className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default TodoComponent;
