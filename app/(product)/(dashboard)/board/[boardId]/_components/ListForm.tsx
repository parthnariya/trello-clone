"use client";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./ListWrapper";
import { PlusIcon, XIcon } from "lucide-react";
import { ElementRef, KeyboardEventHandler, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "@/components/form/FormInput";
import { useParams, useRouter } from "next/navigation";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useActions";
import { createList } from "@/actions/createList";
import { toast } from "sonner";

export const ListForm = () => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const router = useRouter();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List ${data.title} created`);
      disableEditing();
      router.refresh();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({
      title,
      boardId,
    });
  };

  return (
    <ListWrapper>
      {isEditing ? (
        <form
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
          ref={formRef}
          action={onSubmit}
        >
          <FormInput
            id="title"
            ref={inputRef}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent  hover:border-input focus:border-input  transition"
            placeholder="Enter list title.."
            errors={fieldErrors}
          />
          <input name="boardId" value={params.boardId} hidden />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button size="sm" variant="ghost" onClick={disableEditing}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      ) : (
        <Button
          className="text-neutral-950 w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center justify-start font-medium text-sm h-auto"
          onClick={enableEditing}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add new list
        </Button>
      )}
    </ListWrapper>
  );
};
