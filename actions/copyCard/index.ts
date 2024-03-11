"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCardSchema } from "./schema";
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
  let card;
  try {
    const cardToCopy = await prisma.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!cardToCopy) {
      return {
        error: "Card not found",
      };
    }

    const lastCard = await prisma.card.findFirst({
      where: {
        listId: cardToCopy.listId,
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
        order: newOrder,
        title: `${cardToCopy.title} - copy`,
        description: cardToCopy.description,
        listId: cardToCopy.listId,
      },
      include: {
        list: true,
      },
    });
    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD,
      entityId: card.id,
      entityTitle: card.title,
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to copy",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
