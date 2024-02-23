import { ActionState } from "@/lib/createSafeAction";
import { List } from "@prisma/client";
import { z } from "zod";
import { CopyListSchema } from "./schema";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnType = ActionState<InputType, List>;
