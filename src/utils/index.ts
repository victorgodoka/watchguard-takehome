export const convertDate = (date: Date | string | number): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date))
}

export const isOverdue = (due_at: number, completed: boolean): boolean => {
  const now = Date.now();
  return !completed && due_at < now;
}
