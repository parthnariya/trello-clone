"use client";

import { ListWithCards } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./CardForm";
import { CardItem } from "./CardItem";
import { ListHeader } from "./ListHeader";

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
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          className="shrink-0 h-full w-[272px] select-none"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader data={data} onAddCard={enableEditing} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem key={card.id} index={index} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              disableEditing={disableEditing}
              enableEditing={enableEditing}
              isEditing={isEditing}
              listId={data.id}
              ref={textAreaRef}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
