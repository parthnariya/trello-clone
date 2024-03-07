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
import { useAction } from "@/hooks/useActions";
import { updateListOrder } from "@/actions/updateListOrder";
import { toast } from "sonner";

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

  const { execute: executeListOrderAction } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List Reordered");
    },
    onError(error) {
      toast.error(error);
    },
  });
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
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index + 1 })
      );
      setOrderedData(() => items);
      // TODO : server actions
      executeListOrderAction({ boardId, items });
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
          card.order = index + 1;
        });

        sourceList.cards = reorderedData;
        setOrderedData(() => newOrderedData);
        // TODO : server actions
      } else {
        //* moving cards across the list

        // *1. remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // *2. assign new card id to movedCard
        movedCard.listId = destination.droppableId;

        // *3. add card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // *4 reorder source and destination list
        sourceList.cards.forEach((item, index) => (item.order = index + 1));
        destinationList.cards.forEach(
          (card, index) => (card.order = index + 1)
        );

        setOrderedData(() => newOrderedData);
        // TODO : server actions
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
