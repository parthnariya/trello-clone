"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModalContext } from "@/contexts/ModalContext";
import { CardWithList } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ModalHeader from "./ModalHeader";

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
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
