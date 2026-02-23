"use client";
import { X, CircleAlert, CircleCheck } from "lucide-react";

export default function Toast({
  type,
  title,
  message,
  closeToast,
}: {
  type: "success" | "error";
  title: string;
  message?: string;
  closeToast?: () => void;
}) {
  return (
    <div
      className={`${
        type === "success"
          ? "border-l-blue-2"
          : type === "error"
            ? "border-l-red-500"
            : ""
      } bg-white flex gap-6 max-w-112.5 w-[98%] rounded-md p-4 fixed bottom-4 right-4 shadow-md items-center border-l-[5px] `}
    >
      {type === "success" ? (
        <CircleCheck size="36" className="fill-blue-2 text-white" />
      ) : type === "error" ? (
        <CircleAlert size="36" className="fill-red-500 text-white" />
      ) : null}
      <div className="flex flex-col gap-1 grow">
        <p className="font-medium text-grey-1">{title}</p>
        {message && <p className="text-bt text-blue-1">{message}</p>}
      </div>
      {closeToast && (
        <button
          className="cursor-pointer"
          onClick={() => {
            closeToast();
          }}
        >
          <X className="text-grey-3" size="18" />
        </button>
      )}
    </div>
  );
}
