import { Icon } from "@iconify/react";
import type { Todo } from "../types/todo";
import { twMerge } from "tailwind-merge";
import { convertDate } from "../utils";

interface ToDoComponentProps extends Todo {
  overdue?: boolean;
}

const ToDoComponent = ({
  title,
  description,
  completed,
  created_at,
  completed_at,
  due_at,
  overdue
}: ToDoComponentProps) => {
  return (
    <div className="group grid grid-cols-[auto_1fr] gap-3 border-b border-gray-200/10 p-4 transition-colors hover:bg-gray-500/5 cursor-pointer">
      <div
        className={twMerge(
          "mt-0.5 flex size-5 items-center justify-center rounded-full border transition-colors",
          completed
            ? "border-green-600 bg-green-600 text-white"
            : "border-gray-400 text-transparent group-hover:border-green-600"
        )}
      >
        {completed && <Icon icon="material-symbols:check" className="size-4" />}
      </div>

      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className={twMerge(
                "font-medium text-base leading-6 wrap-break-word",
                completed && "text-gray-500 line-through"
              )}
            >
              {title}
            </p>

            {description && (
              <p className="mt-1 text-sm leading-5 text-zinc-500">
                {description}
              </p>
            )}
          </div>

          {completed ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700">
              <Icon icon="material-symbols:check-circle-outline" />
              Completed
            </span>
          ) : overdue ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-600">
              <Icon icon="material-symbols:warning-outline" />
              Overdue
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-between gap-x-5 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-zinc-400">
            <Icon
              icon="material-symbols:calendar-today-outline"
              className="size-4 text-zinc-500"
            />
            <span className="font-medium">Created:</span>
            {convertDate(created_at)}
          </span>

          {completed ? (
            completed_at && (
              <span className="inline-flex items-center gap-1.5 font-medium text-green-700">
                <Icon
                  icon="material-symbols:check-circle-outline"
                  className="size-4"
                />
                Completed: {convertDate(completed_at)}
              </span>
            )
          ) : (
            due_at && (
              <span
                className={twMerge(
                  "inline-flex items-center gap-1.5 font-medium",
                  overdue ? "text-red-600" : "text-zinc-400"
                )}
              >
                <Icon
                  icon="material-symbols:event-outline"
                  className={twMerge(
                    "size-4",
                    overdue ? "text-red-600" : "text-zinc-100"
                  )}
                />
                <span>Due:</span>
                {convertDate(due_at)}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoComponent;