"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateCardSchema } from "./schema";
import createAuditLog from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId, ...values } = data;
  let card;
  try {
    card = await prisma.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
    await createAuditLog({
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.CARD,
      entityId: card.id,
      entityTitle: card.title,
    });
  } catch (e) {
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`board/${boardId}`);
  return {
    data: card,
  };
};

export const updateCard = createSafeAction(UpdateCardSchema, handler);
