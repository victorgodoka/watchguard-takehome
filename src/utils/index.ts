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
