import { createCard } from "@/actions/createCard";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextArea from "@/components/form/FormTextArea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { PlusIcon, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type CardFormPropType = {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormPropType>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card ${data.title} created`);
        formRef.current?.reset();
        disableEditing();
      },
      onError(error) {
        toast.error(error);
      },
    });

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeydown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;
      execute({ boardId, listId, title });
    };

    if (isEditing) {
      return (
        <form
          action={onSubmit}
          ref={formRef}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextArea
            id="title"
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
            onKeyDown={onTextareaKeyDown}
          />
          <input name="listId" defaultValue={listId} hidden />
          <input name="boardId" defaultValue={params.boardId} hidden />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Card</FormSubmit>
            <Button size="sm" variant="ghost" onClick={disableEditing}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="p-2">
        <Button
          className="h-auto px-2 py-1.5  w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add card...
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
