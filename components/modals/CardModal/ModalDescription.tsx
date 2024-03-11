"use client";
import { updateCard } from "@/actions/updateCard";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextArea from "@/components/form/FormTextArea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useActions";
import { CardWithList } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeftIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

const ModalDescription = ({ data }: { data: CardWithList }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const { fieldErrors, execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      queryClient.invalidateQueries({ queryKey: ["card-log", data.id] });
      disableEditing();
      toast.success("title updated successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    textareaRef.current?.focus();
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

  const onSubmitHandler = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    if (data.description === description) return;
    execute({ boardId, id: data.id, description });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeftIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} className="space-y-2" action={onSubmitHandler}>
            <FormTextArea
              id="description"
              className="w-full mt-2"
              placeholder="Add more detailed description..."
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                size="sm"
                type="button"
                onClick={disableEditing}
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            onClick={enableEditing}
          >
            {data.description || "Add more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

ModalDescription.Skeleton = function ModalDescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full mb-2 bg-neutral-200" />
      </div>
    </div>
  );
};

export default ModalDescription;
