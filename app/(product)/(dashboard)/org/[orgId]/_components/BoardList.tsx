import Hint from "@/components/Hint";
import FormPopover from "@/components/form/FormPopover";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircleIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }
  const boards = await prisma.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2Icon className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
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
BoardList.Skeleton = function BoardListSkeleton () {
  return <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
    <Skeleton className="h-full w-full aspect-video p-2"/>
  </div>
}
