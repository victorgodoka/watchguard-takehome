import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import type { ToastType } from "../types/toast";

type ToastComponentProps = {
  message: string;
  type?: ToastType;
  onClose: () => void;
};

const ToastComponent = ({ message, type = "info", onClose }: ToastComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.matches(":popover-open")) el.showPopover();
  }, []);

  return (
    <div
      ref={ref}
      popover="manual"
      role="status"
      data-type={type}
      className="inset-auto top-3 right-3 m-0 w-full max-w-72 rounded-md p-4 pr-12 text-white shadow-2xl data-[type=error]:bg-toast-error data-[type=info]:bg-toast-info data-[type=success]:bg-toast-success"
    >
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-1.5 right-1.5 cursor-pointer rounded-md bg-black/20 p-1"
      >
        <Icon icon="material-symbols:close" className="text-white" />
      </button>
    </div>
  );
};

export default ToastComponent;
