"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateCardSchema } from "./schema";
import createAuditLog from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId, listId } = data;
  let card;
  try {
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });
    if (!list) {
      return {
        error: "List not found!",
      };
    }
    const lastCard = await prisma.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await prisma.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD,
      entityId: card.id,
      entityTitle: card.title,
    });
  } catch (e) {
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`board/${boardId}`);
  return {
    data: card,
  };
};

export const createCard = createSafeAction(CreateCardSchema, handler);
