
import { useCallback, useEffect, useState } from "react";
import { dbPromise } from "../db/database";
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
} from "../types/todo";
import { createTodosRepository } from "../db/todos.repository";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const db = await dbPromise;
    const repository = createTodosRepository(db);
    const result = await repository.getAll();
    setTodos(result);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        await refresh();
      } catch {
        setError("Couldn't load To-Dos.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [refresh]);

  async function create(input: CreateTodoInput) {
    const db = await dbPromise;
    const repository = createTodosRepository(db);
    const todo = await repository.create(input);
    await refresh();
    return todo;
  }

  async function update(
    id: string,
    changes: UpdateTodoInput
  ) {
    const db = await dbPromise;
    const repository = createTodosRepository(db);
    const todo = await repository.update(id, changes);
    await refresh();
    return todo;
  }

  async function toggleCompleted(id: string) {
    const db = await dbPromise;
    const repository = createTodosRepository(db);
    const todo = await repository.toggleCompleted(id);
    await refresh();
    return todo;
  }

  async function remove(id: string) {
    const db = await dbPromise;
    const repository = createTodosRepository(db);
    await repository.delete(id);
    await refresh();
  }

  return {
    todos,
    loading,
    error,
    refresh,
    create,
    update,
    toggleCompleted,
    remove,
  };
}
