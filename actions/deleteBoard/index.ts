"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteBoardSchema } from "./schema";
import { redirect } from "next/navigation";
import createAuditLog from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id } = data;
  let board;
  try {
    board = await prisma.board.delete({
      where: {
        id,
        orgId,
      },
    });
    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD,
      entityId: board.id,
      entityTitle: board.title,
    });
  } catch (e) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/org/${orgId}`);
  redirect(`/org/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);
