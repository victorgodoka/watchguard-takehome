import { ToDoComponent, MenuComponent } from "./components";
import type { Todo } from "./types/todo";
import { isOverdue } from "./utils";

const mockTodos: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: "Buy groceries",
    description: "Get milk, eggs, bread, and fruit",
    created_at: Date.now() - (5 * 60 * 60 * 1000),
    due_at: Date.now() - ((60 * 60 * 1000) * (Math.random() * 5)),
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Finish project report",
    description: "Review the final changes and send the report",
    created_at: Date.now() - (5 * 60 * 60 * 1000),
    due_at: Date.now() + ((60 * 60 * 1000) * (Math.random() * 5)),
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Go for a run",
    description: "Run for 30 minutes in the park",
    created_at: Date.now() - (5 * 60 * 60 * 1000),
    due_at: Date.now() + ((60 * 60 * 1000) * (Math.random() * 5)),
    completed: true,
    completed_at: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: "Read a book",
    created_at: Date.now() - (5 * 60 * 60 * 1000),
    due_at: Date.now() + ((60 * 60 * 1000) * (Math.random() * 5)),
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Clean the apartment",
    description: "Vacuum the floors and organize the living room",
    created_at: Date.now() - (5 * 60 * 60 * 1000),
    due_at: Date.now() + ((60 * 60 * 1000) * (Math.random() * 5)),
    completed: true,
    completed_at: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: "Reply to emails",
    description: "Respond to pending work emails",
    created_at: Date.now() - (5 * 60 * 60 * 1000),
    due_at: Date.now() + ((60 * 60 * 1000) * (Math.random() * 5)),
    completed: false,
  },
];

function App() {

  return (
    <main className="flex flex-col gap-2 mx-auto">
      <MenuComponent />
      <div className="w-full max-w-lg mx-auto">
        {mockTodos.map((todo) => (
          <ToDoComponent key={todo.id} {...todo} overdue={isOverdue(todo.due_at, todo.completed)} />
        ))}
      </div>
    </main>
  )
}

export default App
