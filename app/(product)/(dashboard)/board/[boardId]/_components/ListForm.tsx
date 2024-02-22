"use client";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./ListWrapper";
import { PlusIcon, XIcon } from "lucide-react";
import { ElementRef, KeyboardEventHandler, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "@/components/form/FormInput";
import { useParams } from "next/navigation";
import FormSubmit from "@/components/form/FormSubmit";

export const ListForm = () => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <ListWrapper>
      {isEditing ? (
        <form
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
          ref={formRef}
        >
          <FormInput
            id="title"
            ref={inputRef}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent  hover:border-input focus:border-input  transition"
            placeholder="Enter list title.."
          />
          <input name="boardId" value={params.boardId} hidden />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button size="sm" variant="ghost" onClick={disableEditing}>
              <XIcon className="h-5 w-5"/>
            </Button>
          </div>
        </form>
      ) : (
        <Button
          className="text-neutral-950 w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center justify-start font-medium text-sm"
          onClick={enableEditing}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add new list
        </Button>
      )}
      {/* <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"> */}

      {/* </form> */}
    </ListWrapper>
  );
};
