"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";

type FormSubmitPropType = ButtonProps & { children: React.ReactNode };
const FormSubmit = (props: FormSubmitPropType) => {
  const { children, disabled } = props;
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || disabled} type="submit" size="sm">
      {children}
    </Button>
  );
};

export default FormSubmit;
