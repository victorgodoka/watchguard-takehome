import { useState } from "react";
import { ToastComponent, TodoComponent, TodoFormComponent } from "./components";
import { useToast } from "./hooks/useToast";
import { useTodoModal } from "./hooks/useTodoModal";
import { useTodos } from "./hooks/useTodos";
import type { Todo } from "./types/todo";
import type { TodoStatusFilter } from "./types/todo-filters";
import { filterTodos } from "./utils";

const App = () => {
  const { todos, loading, error, create, update, toggleCompleted, remove } = useTodos();
  const { toast, showToast, dismissToast } = useToast();
  const { ref: formRef, editing, open: openForm, reset: resetForm } = useTodoModal();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TodoStatusFilter>("all");

  const visibleTodos = filterTodos(todos, { search, status });

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      showToast("Task deleted successfully!", "success");
    } catch (error: unknown) {
      showToast(error instanceof Error ? error.message : "Couldn't delete the task.", "error");
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const newTodo = await toggleCompleted(todo.id);
      if (newTodo.completed) {
        showToast("Task completed successfully!", "success");
      } else {
        showToast("Task reverted successfully!", "success");
      }
    } catch (error: unknown) {
      showToast(error instanceof Error ? error.message : "Couldn't complete the task.", "error");
    }
  };

  return (
    <main>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4">
        <button type="button" className="cursor-pointer bg-zinc-200 p-4 font-bold col-span-3" onClick={() => openForm()}>
          New task
        </button>
        
        <div className="flex flex-wrap gap-2">
          <label htmlFor="search" className="sr-only">
            Search tasks
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description"
            className="min-w-0 flex-1 bg-zinc-200 p-4"
          />

          <label htmlFor="status" className="sr-only">
            Filter by status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TodoStatusFilter)}
            className="cursor-pointer bg-zinc-200 p-4 font-bold"
          >
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {loading && <p className="text-center text-zinc-600">Loading tasks...</p>}
        {error && (
          <p role="alert" className="rounded-md bg-red-700 p-2 text-center text-white">
            {error}
          </p>
        )}

        {visibleTodos.map((todo) => (
          <TodoComponent data-type={'teste'} key={todo.id} todo={todo} toggleCompleteToDo={handleToggleComplete} editToDo={openForm} deleteToDo={handleDelete} />
        ))}
      </div>

      <TodoFormComponent
        ref={formRef}
        todo={editing}
        create={create}
        update={update}
        notify={showToast}
        onClose={resetForm}
      />

      {toast && <ToastComponent key={toast.id} message={toast.message} type={toast.type} onClose={dismissToast} />}
    </main>
  );
};

export default App;
