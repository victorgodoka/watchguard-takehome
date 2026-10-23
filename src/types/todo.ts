import type { DBSchema } from "idb";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  created_at: number;
  completed: boolean;
}

export type CreateTodoInput = Pick<
  Todo,
  "title"
> & {
  description?: string;
};

export type UpdateTodoInput = Partial<
  Pick<Todo, "title" | "description" | "completed">
>;

export interface TodoDB extends DBSchema {
  todos: {
    key: string;
    value: Todo;
    indexes: {
      "by-created-at": number;
    };
  };
}
