import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/Info";
import { BoardList } from "./_components/BoardList";

export default function OrgPage() {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}