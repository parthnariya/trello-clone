"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateListSchema } from "./schema";
import createAuditLog from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, title, boardId } = data;
  let list;
  try {
    list = await prisma.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.LIST,
      entityId: list.id,
      entityTitle: list.title,
    });
  } catch (e) {
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`board/${boardId}`);
  return {
    data: list,
  };
};

export const updateList = createSafeAction(UpdateListSchema, handler);
