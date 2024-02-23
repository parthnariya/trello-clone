"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormErrors from "./FormErrors";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  errors?: Record<string, string[] | undefined>;
  label?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { label, id, disabled, className, errors } = props;
  const { pending } = useFormStatus();
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label && (
          <Label
            htmlFor={id}
            className="text-xs font-semibold text-neutral-700"
          >
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          name={id}
          disabled={pending || disabled}
          className={cn("text-sm px-2 py-1 h-7", className)}
          aria-describedby={`${id}-error`}
          {...props}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
});

FormInput.displayName = "FormInput";
export default FormInput;
