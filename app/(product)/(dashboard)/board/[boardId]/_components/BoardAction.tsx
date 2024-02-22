"use client";

import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useActions";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

type BoardActionPropType = {
  id: string;
};
export const BoardAction = ({ id }: BoardActionPropType) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess() {
      toast.success("Board deleted successfully");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onClickHandler = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
          onClick={onClickHandler}
          disabled={isLoading}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
