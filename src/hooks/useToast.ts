
import { useCallback, useEffect, useRef, useState } from "react";
import type { ToastData, ToastType } from "../types/toast";


export function useToast(duration = 2000) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);
  
  const dismissToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setToast(null);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = ++idRef.current;

      setToast({ id, message, type });

      timeoutRef.current = setTimeout(() => {
        setToast((current) =>
          current?.id === id ? null : current
        );
        timeoutRef.current = null;
      }, duration);
    },
    [duration]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    toast,
    showToast,
    dismissToast,
  };
}
