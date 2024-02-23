import { ActionState } from "@/lib/createSafeAction";
import { List } from "@prisma/client";
import { z } from "zod";
import { DeleteListSchema } from "./schema";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
