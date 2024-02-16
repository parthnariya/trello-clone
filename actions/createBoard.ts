"use server";
import { prisma } from "@/lib/db";

export async function createBoard(formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.board.create({
    data: {
      title,
    },
  });
}
