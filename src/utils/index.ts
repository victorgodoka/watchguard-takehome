import type { Todo } from "../types/todo";
import type { TodoStatusFilter, TodoFilters } from "../types/todo-filters";

export const formatDate = (date: number): string => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export const toDateTimeLocal = (date: number): string => {
  const offset = new Date(date).getTimezoneOffset() * 60_000;
  return new Date(date - offset).toISOString().slice(0, 16);
};

export const isOverdue = (completed: boolean, due_at?: number): boolean => {
  return !completed && due_at != null && due_at < Date.now();
};
const matchesSearch = (todo: Todo, search: string): boolean => {
  const needle = search.trim().toLowerCase();
  if (!needle) return true;

  return [todo.title, todo.description ?? ""].some((text) => text.toLowerCase().includes(needle));
};

const matchesStatus = (todo: Todo, status: TodoStatusFilter): boolean => {
  switch (status) {
    case "completed":
      return todo.completed;
    case "incomplete":
      return !todo.completed;
    case "overdue":
      return isOverdue(todo.completed, todo.due_at);
    case "all":
      return true;
  }
};

export const filterTodos = (todos: Todo[], { search, status }: TodoFilters): Todo[] => {
  return todos.filter((todo) => matchesStatus(todo, status) && matchesSearch(todo, search));
};