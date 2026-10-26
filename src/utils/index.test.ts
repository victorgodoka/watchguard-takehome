import { describe, expect, it } from "vitest";

import type { Todo } from "../types/todo";
import { filterTodos, isOverdue, toDateTimeLocal } from "./index";

const HOUR = 60 * 60 * 1000;

const makeTodo = (overrides: Partial<Todo>): Todo => ({
  id: crypto.randomUUID(),
  title: "Task",
  created_at: Date.now(),
  completed: false,
  ...overrides,
});

describe("isOverdue", () => {
  it("is true when the due date has passed and the todo is not completed", () => {
    expect(isOverdue(false, Date.now() - HOUR)).toBe(true);
  });

  it("is false when the due date is in the future", () => {
    expect(isOverdue(false, Date.now() + HOUR)).toBe(false);
  });

  it("is false when the todo is completed", () => {
    expect(isOverdue(true, Date.now() - HOUR)).toBe(false);
  });

  it("is false when there is no due date", () => {
    expect(isOverdue(false)).toBe(false);
  });
});

describe("toDateTimeLocal", () => {
  it("formats a timestamp for a datetime-local input in local time", () => {
    const date = new Date(2026, 11, 1, 10, 30).getTime();

    expect(toDateTimeLocal(date)).toBe("2026-12-01T10:30");
  });
});

describe("filterTodos", () => {
  const groceries = makeTodo({ title: "Buy groceries", description: "Milk and bread" });
  const report = makeTodo({ title: "Finish report", completed: true, completed_at: Date.now() });
  const run = makeTodo({ title: "Go for a run", due_at: Date.now() - HOUR });
  const todos = [groceries, report, run];

  it("returns every todo with an empty search and the all status", () => {
    expect(filterTodos(todos, { search: "", status: "all" })).toEqual(todos);
  });

  it("matches the title ignoring case and surrounding spaces", () => {
    expect(filterTodos(todos, { search: "  REPORT ", status: "all" })).toEqual([report]);
  });

  it("matches the description", () => {
    expect(filterTodos(todos, { search: "bread", status: "all" })).toEqual([groceries]);
  });

  it("returns only completed todos", () => {
    expect(filterTodos(todos, { search: "", status: "completed" })).toEqual([report]);
  });

  it("returns only incomplete todos", () => {
    expect(filterTodos(todos, { search: "", status: "incomplete" })).toEqual([groceries, run]);
  });

  it("returns only overdue todos", () => {
    expect(filterTodos(todos, { search: "", status: "overdue" })).toEqual([run]);
  });

  it("combines search and status", () => {
    expect(filterTodos(todos, { search: "go", status: "incomplete" })).toEqual([run]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterTodos(todos, { search: "missing", status: "all" })).toEqual([]);
  });
});
