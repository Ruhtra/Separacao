import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ItemCard } from "./ItemCard";

interface ItemListProps {
  items: GetListItemDtoResponse[];
}
type ItemQuantity = {
  [key: string]: number;
};

export function ItemList({ items }: ItemListProps) {
  const [confirmedQuantities, setConfirmedQuantities] = useState<ItemQuantity>(
    {}
  );

  const handleConfirm = (item: GetListItemDtoResponse, quantity: number) => {
    setConfirmedQuantities((prev) => ({
      ...prev,
      [item.idseparacao_item]: quantity,
    }));
  };

  return (
    <ScrollArea className="h-full px-4 py-6">
      <div className="container mx-auto space-y-4">
        {items.map((item) => (
          <ItemCard
            key={item.idseparacao_item}
            item={item}
            onConfirm={handleConfirm}
            confirmedQuantity={confirmedQuantities[item.idseparacao_item]}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
