import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

type TodoPillProps = {
  label: string;
  icon: string;
  colorClass?: string;
}; 

const TodoPill = ({ label, icon, colorClass }: TodoPillProps) => {
  return (
    <span
      className={twMerge(
        "flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium text-white",
        colorClass || "bg-darker",
      )}
    >
      <Icon icon={icon} className="size-4" />
      <span className="hidden md:inline">{label}</span>
    </span>
  );
};

export default TodoPill