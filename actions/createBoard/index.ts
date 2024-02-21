"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  
  if (
    !imageId ||
    !imageFullUrl ||
    !imageThumbUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing Fields. Failed to create board",
    };
  }
  let board;
  try {
    board = await prisma.board.create({
      data: {
        title,
        imageId,
        imageFullUrl,
        imageLinkHTML,
        imageThumbUrl,
        imageUserName,
        orgId,
      },
    });
  } catch (e) {
    return { error: "Failed to create board" };
  }
  revalidatePath(`board/${board.id}`);
  return {
    data: board,
  };
};
export const createBoard = createSafeAction(CreateBoardSchema, handler);
