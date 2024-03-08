import { ActionState } from "@/lib/createSafeAction";
import { Card } from "@prisma/client";
import { z } from "zod";
import { DeleteCardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
