"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

type CardItemPropType = {
  data: Card;
  index: number;
};
export const CardItem = ({ data, index }: CardItemPropType) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <div
            role="button"
            className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {data.title}
          </div>
        );
      }}
    </Draggable>
  );
};
