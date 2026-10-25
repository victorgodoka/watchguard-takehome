import type { IDBPDatabase } from "idb";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo";
import type { TodoDB } from "./database";

export function createTodosRepository(db: IDBPDatabase<TodoDB>) {
  return {
    async create(input: CreateTodoInput): Promise<Todo> {
      const title = input.title.trim();
      const description = input.description?.trim() || undefined;

      if (!title) {
        throw new Error("Title is required");
      }

      const todo: Todo = {
        id: crypto.randomUUID(),
        title,
        description,
        created_at: Date.now(),
        due_at: input.due_at,
        completed: false,
      };

      await db.add("todos", todo);

      return todo;
    },

    async update(
      id: string,
      changes: UpdateTodoInput
    ): Promise<Todo> {
      const tx = db.transaction("todos", "readwrite");
      const existing = await tx.store.get(id);

      if (!existing) {
        tx.abort();
        await tx.done.catch(() => undefined);
        throw new Error("Todo not found");
      }

      const title =
        changes.title === undefined
          ? existing.title
          : changes.title.trim();

      if (!title) {
        tx.abort();
        await tx.done.catch(() => undefined);
        throw new Error("Title is required");
      }

      const updated: Todo = {
        ...existing,
        ...changes,
        title,
        description:
          changes.description === undefined
            ? existing.description
            : changes.description.trim() || undefined,
        id: existing.id,
        created_at: existing.created_at,
      };

      await tx.store.put(updated);
      await tx.done;

      return updated;
    },

    async toggleCompleted(id: string): Promise<Todo> {
      const tx = db.transaction("todos", "readwrite");
      const existing = await tx.store.get(id);

      if (!existing) {
        tx.abort();
        await tx.done.catch(() => undefined);
        throw new Error("Todo not found");
      }

      const updated: Todo = {
        ...existing,
        completed_at: existing.completed ? undefined : Date.now(),
        completed: !existing.completed,
      };

      await tx.store.put(updated);
      await tx.done;

      return updated;
    },

    async getAll(): Promise<Todo[]> {
      const todos = await db.getAllFromIndex("todos", "by-created-at");
      return todos.reverse();
    },

    async getById(id: string): Promise<Todo | undefined> {
      return db.get("todos", id);
    },

    async delete(id: string): Promise<void> {
      await db.delete("todos", id);
    },
  };
}