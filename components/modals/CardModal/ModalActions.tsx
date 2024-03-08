import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deleteCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalContext } from "@/contexts/ModalContext";
import { useAction } from "@/hooks/useActions";
import { CardWithList } from "@/lib/types";
import { CopyIcon, TrashIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

type ModalActionPropType = {
  data: CardWithList;
};

const ModalActions = ({ data }: ModalActionPropType) => {
  const params = useParams();
  const { handleClose } = useContext(ModalContext);
  const { execute: copyCardExecute, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`${data.title} copied successfully`);
        handleClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const { execute: deleteCardExecute, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast.success(`${data.title} deleted successfully`);
        handleClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;
    copyCardExecute({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    deleteCardExecute({ id: data.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <CopyIcon className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <TrashIcon className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

ModalActions.Skeleton = function ModalActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-20 h-4 bg-neutral-200" />
    </div>
  );
};

export default ModalActions;
