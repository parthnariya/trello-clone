"use client";
import { ListWithCards } from "@/lib/types";
import { ListForm } from "./ListForm";

type CardListContainer = {
  boardId: string;
  data: ListWithCards[];
};

export const CardListContainer = ({ boardId, data }: CardListContainer) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
