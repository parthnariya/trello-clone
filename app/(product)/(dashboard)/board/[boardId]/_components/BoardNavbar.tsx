import { Board } from "@prisma/client";
import { BoardTitleForm } from "./BoardTitleForm";
import { BoardAction } from "./BoardAction";

type BoardNavbarPropType = {
  data: Board;
};
export const BoardNavbar = async ({ data }: BoardNavbarPropType) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white ">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardAction id={data.id} />
      </div>
    </div>
  );
};
