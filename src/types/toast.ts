export type ToastType = "success" | "error" | "info";

export type ToastData = {
  id: number;
  message: string;
  type: ToastType;
};
