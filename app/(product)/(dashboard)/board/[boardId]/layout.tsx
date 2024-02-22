import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/BoardNavbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }
  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  if (!board) {
    notFound();
  }
  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-no-repeat bg-cover bg-center"
    >
      <BoardNavbar data={board} />
      <div className="inset-0 absolute bg-black/10" />
      <main className="pt-28 h-full relative">{children}</main>
    </div>
  );
}
