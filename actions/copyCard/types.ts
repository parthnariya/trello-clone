import { ActionState } from "@/lib/createSafeAction";
import { Card } from "@prisma/client";
import { z } from "zod";
import { CopyCardSchema } from "./schema";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
