"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteListSchema } from "./schema";
import { InputType, ReturnType } from "./types";
import createAuditLog from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let list;
  try {
    await prisma.card.deleteMany({
      where: {
        listId: id,
      },
    });
    list = await prisma.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.LIST,
      entityId: list.id,
      entityTitle: list.title,
    });
  } catch (e) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
