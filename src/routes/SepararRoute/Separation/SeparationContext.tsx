"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";

type ItemStatus = "idle" | "pending" | "success" | "error";

type SeparationContextType = {
  items: GetListItemDtoResponse[];
  updateItemStatus: (idseparacao_item: number, qtd_separada: number) => void;
  canConfirmAll: boolean;
  itemConfirmationStatus: Record<number, ItemStatus>;
  updateItemConfirmationStatus: (
    idseparacao_item: number,
    status: ItemStatus
  ) => void;
};

const SeparationContext = createContext<SeparationContextType | undefined>(
  undefined
);

export const useSeparationContext = () => {
  const context = useContext(SeparationContext);
  if (!context) {
    throw new Error(
      "useSeparationContext must be used within a SeparationProvider"
    );
  }
  return context;
};

type SeparationProviderProps = {
  children: ReactNode;
  initialItems: GetListItemDtoResponse[];
};

export const SeparationProvider: React.FC<SeparationProviderProps> = ({
  children,
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const [itemConfirmationStatus, setItemConfirmationStatus] = useState<
    Record<number, ItemStatus>
  >(
    Object.fromEntries(
      initialItems.map((item) => [item.idseparacao_item, "idle"])
    )
  );

  const updateItemStatus = (idseparacao_item: number, qtd_separada: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.idseparacao_item === idseparacao_item
          ? { ...item, qtd_separada }
          : item
      )
    );
  };

  const updateItemConfirmationStatus = (
    idseparacao_item: number,
    status: ItemStatus
  ) => {
    setItemConfirmationStatus((prevStatus) => ({
      ...prevStatus,
      [idseparacao_item]: status,
    }));
  };

  const canConfirmAll = true;

  return (
    <SeparationContext.Provider
      value={{
        items,
        updateItemStatus,
        canConfirmAll,
        itemConfirmationStatus,
        updateItemConfirmationStatus,
      }}
    >
      {children}
    </SeparationContext.Provider>
  );
};
