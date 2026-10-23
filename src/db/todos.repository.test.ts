import "fake-indexeddb/auto";

import { openDB, type IDBPDatabase } from "idb";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createTodosRepository } from "./todos.repository";
import type { TodoDB } from "../types/todo";

describe("todos repository", () => {
  let db: IDBPDatabase<TodoDB>;
  let repository: ReturnType<typeof createTodosRepository>;

  beforeEach(async () => {
    db = await openDB<TodoDB>(crypto.randomUUID(), 1, {
      upgrade(db) {
        const store = db.createObjectStore("todos", {
          keyPath: "id",
        });

        store.createIndex("by-created-at", "created_at");
      },
    });

    repository = createTodosRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it("creates a todo", async () => {
    const todo = await repository.create({
      title: "Buy groceries",
    });

    expect(todo.title).toBe("Buy groceries");
    expect(todo.completed).toBe(false);
    expect(await repository.getById(todo.id)).toEqual(todo);
  });

  it("trims the title and description", async () => {
    const todo = await repository.create({
      title: "  Buy groceries  ",
      description: "  Milk and bread  ",
    });

    expect(todo.title).toBe("Buy groceries");
    expect(todo.description).toBe("Milk and bread");
  });

  it("does not create a todo without a title", async () => {
    await expect(
      repository.create({ title: "   " })
    ).rejects.toThrow("Title is required");
  });

  it("updates a todo", async () => {
    const todo = await repository.create({
      title: "Buy groceries",
    });

    const updated = await repository.update(todo.id, {
      title: "Go shopping",
      completed: true,
    });

    expect(updated.title).toBe("Go shopping");
    expect(updated.completed).toBe(true);
    expect(updated.id).toBe(todo.id);
  });

  it("keeps the existing values when they are not updated", async () => {
    const todo = await repository.create({
      title: "Buy groceries",
      description: "Milk and bread",
    });

    const updated = await repository.update(todo.id, {
      title: "Go shopping",
    });

    expect(updated.description).toBe("Milk and bread");
    expect(updated.created_at).toBe(todo.created_at);
  });

  it("does not update a todo with an empty title", async () => {
    const todo = await repository.create({
      title: "Buy groceries",
    });

    await expect(
      repository.update(todo.id, { title: " " })
    ).rejects.toThrow("Title is required");

    await expect(repository.getById(todo.id)).resolves.toEqual(todo);
  });

  it("throws when updating a todo that does not exist", async () => {
    await expect(
      repository.update("missing-id", { title: "New title" })
    ).rejects.toThrow("Todo not found");
  });

  it("toggles the completed status", async () => {
    const todo = await repository.create({
      title: "Buy groceries",
    });

    const completed = await repository.toggleCompleted(todo.id);
    expect(completed.completed).toBe(true);

    const pending = await repository.toggleCompleted(todo.id);
    expect(pending.completed).toBe(false);
  });

  it("throws when toggling a todo that does not exist", async () => {
    await expect(
      repository.toggleCompleted("missing-id")
    ).rejects.toThrow("Todo not found");
  });

  it("returns all todos in descending order of creation", async () => {
    await repository.create({ title: "First task" });
    await repository.create({ title: "Second task" });

    const todos = await repository.getAll();

    expect(todos).toHaveLength(2);
    expect(todos.map((todo) => todo.title)).toEqual([
      "Second task",
      "First task",
    ]);
  });

  it("returns undefined when a todo does not exist", async () => {
    await expect(
      repository.getById("missing-id")
    ).resolves.toBeUndefined();
  });

  it("deletes a todo", async () => {
    const todo = await repository.create({
      title: "Buy groceries",
    });

    await repository.delete(todo.id);

    await expect(
      repository.getById(todo.id)
    ).resolves.toBeUndefined();
  });
});