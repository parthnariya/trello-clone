"use client";

import { updateBoard } from "@/actions/updateBoard";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

type BoardTitleFormPropType = {
  data: Board;
};

export const BoardTitleForm = ({ data }: BoardTitleFormPropType) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const { execute } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success(`Board "${data.title}" updated!`);
      disableEditing();
      setTitle(data.title);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (editing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className="bg-transparent text-lg font-bold px-[7px] py-1 h-7 focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};
