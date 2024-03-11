"use client";
import CardModal from "@/components/modals/CardModal";
import React, { createContext, useEffect, useState } from "react";

type ModalContextType = {
  id?: string;
  isOpen: boolean;
  handleOpen: (id: string) => void;
  handleClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  handleClose: () => {},
  handleOpen: () => {},
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setId(undefined);
    setIsOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  const contextValue = {
    isOpen,
    id,
    handleOpen,
    handleClose,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      <CardModal />
      {children}
    </ModalContext.Provider>
  );
};
