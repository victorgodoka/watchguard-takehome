import { ToDoComponent } from "./components";
import type { Todo } from "./types/todo";

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Get milk, eggs, bread, and fruit",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: "2",
    title: "Finish project report",
    description: "Review the final changes and send the report",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: "3",
    title: "Go for a run",
    description: "Run for 30 minutes in the park",
    created_at: Date.now(),
    completed: true,
  },
  {
    id: "4",
    title: "Read a book",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: "5",
    title: "Clean the apartment",
    description: "Vacuum the floors and organize the living room",
    created_at: Date.now(),
    completed: true,
  },
  {
    id: "6",
    title: "Reply to emails",
    description: "Respond to pending work emails",
    created_at: Date.now(),
    completed: false,
  },
];

function App() {

  return (
    <main className="flex flex-col gap-2 mx-auto">
      <div className="w-full max-w-lg mx-auto">
        {mockTodos.map((todo) => (
          <ToDoComponent key={todo.id} {...todo} />
        ))}
      </div>
    </main>
  )
}

export default App
