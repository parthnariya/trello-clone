"use client";

import { ListWithCards } from "@/lib/types";
import { ListWrapper } from "./ListWrapper";
import { ListHeader } from "./ListHeader";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./CardForm";

type ListItemPropType = {
  index: number;
  data: ListWithCards;
};
export const ListItem = ({ data, index }: ListItemPropType) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <CardForm
          disableEditing={disableEditing}
          enableEditing={enableEditing}
          isEditing={isEditing}
          listId={data.id}
          ref={textAreaRef}
        />
      </div>
    </ListWrapper>
  );
};
