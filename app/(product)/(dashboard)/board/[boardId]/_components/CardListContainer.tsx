"use client";
import { ListWithCards } from "@/lib/types";
import { ListForm } from "./ListForm";
import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { reorder } from "@/lib/utils";

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

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //! if drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //! if user moves a list
    if (type === "list") {
      const item = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(() => item);
      // TODO : server actions
    }

    //! if user moves a card
    if (type === "card") {
      //* getting source and destination card list
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      //* if one of them list is not present
      if (!sourceList || !destinationList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      //* moving cards within the list
      if (source.droppableId === destination.droppableId) {
        const reorderedData = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedData.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedData;
        setOrderedData(() => newOrderedData);
        // TODO : server actions
      } else {
        //* moving cards across the list

        // TODO 1. remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index,1)

        // TODO 2. assign new card id to movedCard
        movedCard.listId = destination.droppableId;

        

      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} data={list} index={index} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
