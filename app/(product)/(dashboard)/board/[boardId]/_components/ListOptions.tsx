import { copyList } from "@/actions/copyList";
import { deleteList } from "@/actions/deleteList";
import FormSubmit from "@/components/form/FormSubmit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useActions";
import { List } from "@prisma/client";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

type ListOptionPropsType = {
  data: List;
  onAddCard: () => void;
};
export const ListOptions = ({ data, onAddCard }: ListOptionPropsType) => {
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`list ${data.title} deleted`);
      closeButtonRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`list ${data.title} copied!`);
      closeButtonRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const deleteFormSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const copyFormSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild ref={closeButtonRef}>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={copyFormSubmit}>
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          />
          <FormSubmit
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Copy List...
          </FormSubmit>
        </form>
        <Separator />
        <form action={deleteFormSubmit}>
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          />
          <FormSubmit
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
