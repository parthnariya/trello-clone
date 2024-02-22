import { ActionState } from "@/lib/createSafeAction";
import { List } from "@prisma/client";
import { z } from "zod";
import { CreateListSchema } from "./schema";

export type InputType = z.infer<typeof CreateListSchema>;
export type ReturnType = ActionState<InputType, List>;
