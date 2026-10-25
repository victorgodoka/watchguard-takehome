export type TodoStatusFilter = "all" | "incomplete" | "completed" | "overdue";

export type TodoFilters = {
  search: string;
  status: TodoStatusFilter;
};
