import { Icon } from "@iconify/react";
import type { Todo } from "../types/todo";
import { convertDate } from "../utils";
import { twMerge } from "tailwind-merge";

interface ToDoComponentProps extends Todo {
  overdue?: boolean;
}

const TodoPill = ({ label, icon, colorClass }: { label: string; icon: string; colorClass?: string }) => {
  return (
    <span className={twMerge(
      "flex items-center gap-1 rounded-full border text-white px-2 py-1 text-xs font-medium",
      colorClass || "bg-darker")}>
      <Icon icon={icon} className="size-4" />
      <span className="hidden md:inline">{label}</span>
    </span>
  );
};

const TodoDate = ({ date, label, icon }: { date: number; label: string; icon: string }) => {
  return (
    <span className="flex items-center justify-end gap-1 text-sm text-zinc-600">
      <Icon icon={icon} />
      <span className="text-zinc-800">{label}:</span>
      {convertDate(date)}
    </span>
  );
};

const ToDoComponent = ({
  title,
  description,
  completed,
  created_at,
  completed_at,
  due_at,
  overdue,
}: ToDoComponentProps) => {
  return (
    <div className="flex items-stretch group">
      <div className="bg-cyan-600 px-3 hidden items-center justify-center cursor-pointer group-hover:flex">
        <Icon icon="boxicons:edit" className="text-2xl text-white" />
      </div>
      <div className="p-4 bg-zinc-200 flex-1">
        <div className="flex justify-between items-start gap-2 w-full">
          <div>
            <p className="font-bold text-xl">{title}</p>
            {description && <p className="text-zinc-800 italic text-sm">{description}</p>}
          </div>

          {completed ? (
            <TodoPill colorClass="bg-green-600 border-green-400" label="Completed" icon="material-symbols:check-circle-outline" />
          ) : overdue ? (
            <TodoPill colorClass="bg-red-600 border-red-400" label="Overdue" icon="material-symbols:warning-outline" />
          ) : null}
        </div>

        <div className="flex flex-wrap justify-end items-center gap-4 mt-2">
          <TodoDate date={created_at} label="Created" icon="material-symbols:calendar-today-outline" />

          {completed ? (
            completed_at != null && (
              <TodoDate date={completed_at} label="Completed" icon="material-symbols:check-circle-outline" />
            )
          ) : (
            due_at != null && (
              <TodoDate date={due_at} label="Due" icon="material-symbols:event-outline" />
            )
          )}
        </div>
      </div>

      <div className="bg-red-600 px-3 hidden items-center justify-center cursor-pointer group-hover:flex">
        <Icon icon="material-symbols:delete" className="text-2xl text-white" />
      </div>
    </div>
  );
};

export default ToDoComponent;