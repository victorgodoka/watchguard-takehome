import { useCallback, useEffect, useState } from "react";
import { dbPromise } from "../db/database";
import { createTodosRepository } from "../db/todos.repository";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo";

const getRepository = async () => createTodosRepository(await dbPromise);

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const repository = await getRepository();
    setTodos(await repository.getAll());
  }, []);

  useEffect(() => {
    async function load() {
      try {
        await refresh();
      } catch {
        setError("Couldn't load tasks.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [refresh]);

  async function create(input: CreateTodoInput) {
    const todo = await (await getRepository()).create(input);
    await refresh();
    return todo;
  }

  async function update(id: string, changes: UpdateTodoInput) {
    const todo = await (await getRepository()).update(id, changes);
    await refresh();
    return todo;
  }

  async function toggleCompleted(id: string) {
    const todo = await (await getRepository()).toggleCompleted(id);
    await refresh();
    return todo;
  }

  async function remove(id: string) {
    await (await getRepository()).delete(id);
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
