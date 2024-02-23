"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FormErrors from "./FormErrors";

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  errors?: Record<string, string[] | undefined>;
  label?: string;
};

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (props, ref) => {
    const { label, id, disabled, className, errors } = props;
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            ref={ref}
            name={id}
            disabled={pending || disabled}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            {...props}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
export default FormTextArea;
