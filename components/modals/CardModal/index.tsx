"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModalContext } from "@/contexts/ModalContext";
import { CardWithList } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ModalHeader from "./ModalHeader";
import ModalDescription from "./ModalDescription";
import ModalActions from "./ModalActions";

const CardModal = () => {
  const { id, isOpen, handleClose } = useContext(ModalContext);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        {!cardData ? <ModalHeader.Skeleton /> : <ModalHeader data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <ModalDescription.Skeleton />
              ) : (
                <ModalDescription data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <ModalActions.Skeleton />
          ) : (
            <ModalActions data={cardData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
