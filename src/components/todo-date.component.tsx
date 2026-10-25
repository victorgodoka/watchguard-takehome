import { Icon } from "@iconify/react";
import { formatDate } from "../utils";

type TodoDateProps = {
  date: number;
  label: string;
  icon: string;
};

const TodoDate = ({ date, label, icon }: TodoDateProps) => {
  return (
    <span className="flex items-center justify-end gap-1 text-sm text-zinc-600">
      <Icon icon={icon} />
      <span className="text-zinc-800">{label}:</span>
      {formatDate(date)}
    </span>
  );
};

export default TodoDate;
