import Hint from "@/components/Hint";
import FormPopover from "@/components/form/FormPopover";
import { HelpCircleIcon, User2Icon } from "lucide-react";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2Icon className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover side="right" sideOffset={10}>
          <div
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              description={`Free Workspace can have upto 5 open boards. for unlimited board upgrade this workspace`}
              sideOffset={40}
            >
              <HelpCircleIcon className="absolute bottom-2 right-2 h-4 w-4" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
