import { openDB } from "idb";
import type { TodoDB } from "../types/todo";

export function createDatabase() {
  return openDB<TodoDB>("todo-app", 1, {
    upgrade(db) {
      const store = db.createObjectStore("todos", {
        keyPath: "id",
      });

      store.createIndex("by-created-at", "created_at");
    },
  });
}

export const dbPromise = createDatabase();

export async function clearTodosForTests() {
  const db = await dbPromise;
  await db.clear("todos");
}
