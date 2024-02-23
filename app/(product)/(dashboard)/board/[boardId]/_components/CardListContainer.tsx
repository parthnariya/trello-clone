"use client";
import { ListWithCards } from "@/lib/types";
import { ListForm } from "./ListForm";
import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

type CardListContainer = {
  boardId: string;
  data: ListWithCards[];
};

export const CardListContainer = ({ boardId, data }: CardListContainer) => {
  /* here we are adding data to local state for Drag N Drop feature after that we move them to DB\
  so useEffect and useState for that feature only */
  const [orderedData, setOrderedData] = useState(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => (
        <ListItem key={list.id} data={list} index={index} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
