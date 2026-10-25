import { type DBSchema, openDB } from "idb";
import type { Todo } from "../types/todo";

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

export function createDatabase(name = "todo-app") {
  return openDB<TodoDB>(name, 1, {
    upgrade(db) {
      const store = db.createObjectStore("todos", {
        keyPath: "id",
      });

      store.createIndex("by-created-at", "created_at");
      store.createIndex("by-completed-at", "completed_at");
      store.createIndex("by-due-at", "due_at");
    },
  });
}

export const dbPromise = createDatabase();
