import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/lib/types";
import { CopyIcon, TrashIcon } from "lucide-react";

type ModalActionPropType = {
  data: CardWithList;
};

const ModalActions = ({ data }: ModalActionPropType) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button variant="gray" className="w-full justify-start" size="inline">
        <CopyIcon className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button variant="gray" className="w-full justify-start" size="inline">
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
