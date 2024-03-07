import { ActionState } from "@/lib/createSafeAction";
import { Card, List } from "@prisma/client";
import { z } from "zod";
import { UpdateCardOrderSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
