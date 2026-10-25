export type Todo = {
  id: string;
  title: string;
  description?: string;
  due_at?: number;
  created_at: number;
  completed: boolean;
  completed_at?: number;
};

export type CreateTodoInput = Pick<Todo, "title" | "description" | "due_at">;

export type UpdateTodoInput = Partial<CreateTodoInput>;
