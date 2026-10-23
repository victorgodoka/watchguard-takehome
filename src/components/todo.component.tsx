import { Icon } from "@iconify/react"
import type { Todo } from "../types/todo"
import { twMerge } from "tailwind-merge"
import { convertDate } from "../utils"

const ToDoComponent = ({ title, description, completed, created_at }: Todo) => {
  return <label className="grid grid-cols-[auto_1fr] min-h-16 gap-2 cursor-pointer border-b border-gray-800/15 p-2">
    <input type="checkbox" className="hidden" />
    <div className="size-4 my-1.5 bg-white border border-gray-400 rounded-full flex items-center justify-center">
      {completed && <Icon icon="material-symbols:check" className="text-green-800" />}
    </div>
    <div className={twMerge(completed && "line-through opacity-50")}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xl">{title}</p>
        {!completed && <p className="text-green-300 text-sm inline-flex items-center gap-1">{convertDate(created_at)} <Icon icon="mdi-light:clock" /></p>}
      </div>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  </label>
}

export default ToDoComponent;