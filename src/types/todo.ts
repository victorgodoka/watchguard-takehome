import type { DBSchema } from "idb";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  due_at?: number;
  created_at: number;
  completed: boolean;
  completed_at?: number;
}

export type CreateTodoInput = Pick<
  Todo,
  "title" & { due_at?:string; description? : string}
  >;

export type UpdateTodoInput = Partial<
  Pick<Todo, "title" | "description" | "completed">
>;

export interface TodoDB extends DBSchema {
  todos: {
    key: string;
    value: Todo;
    indexes: {
      "by-created-at": number;
      "by-completed-at": number;
      "by-due-at": number;
    };
  };
}
