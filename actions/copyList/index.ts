"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyListSchema } from "./schema";
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
    const listToCopy = await prisma.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!listToCopy) {
      return {
        error: "List not found",
      };
    }

    const lastList = await prisma.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    console.log(listToCopy.cards);

    let dataToAppend = {
      boardId: listToCopy.boardId,
      title: `${listToCopy.title} - Copy`,
      order: newOrder,
    };
    // here is condition to copy only list without card
    if (listToCopy.cards.length > 0) {
      dataToAppend = Object.assign(dataToAppend, {
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      });
    }
    list = await prisma.list.create({
      data: dataToAppend,
      include: {
        cards: true,
      },
    });
    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
      entityId: list.id,
      entityTitle: list.title,
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to copy",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyListSchema, handler);
