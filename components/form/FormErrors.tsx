"use client";
import { XCircleIcon } from "lucide-react";

type FormErrorsPropType = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormErrors = ({ id, errors }: FormErrorsPropType) => {
  if (!errors) {
    return null;
  }
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-sm text-rose-500"
    >
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircleIcon className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
