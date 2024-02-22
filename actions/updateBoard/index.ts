"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, title } = data;
  let board;
  try {
    board = await prisma.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (e) {
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`board/${id}`);
  return {
    data: board,
  };
};

export const updateBoard = createSafeAction(UpdateBoardSchema, handler);
