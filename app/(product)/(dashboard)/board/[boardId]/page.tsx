import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CardListContainer } from "./_components/CardListContainer";

type BoardIdPagePropType = {
  params: {
    boardId: string;
  };
};
export default async function BoardIdPage({ params }: BoardIdPagePropType) {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const lists = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <CardListContainer boardId={params.boardId} data={lists} />
    </div>
  );
}
