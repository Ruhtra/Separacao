import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ItemCard } from "./ItemCard";

interface ItemListProps {
  items: GetListItemDtoResponse[];
  numpedido: string;
}

export function ItemList({ items, numpedido }: ItemListProps) {
  return (
    <ScrollArea className="h-full px-4 py-6">
      <div className="container mx-auto space-y-4">
        {items.map((item) => (
          <ItemCard
            key={item.idseparacao_item}
            numpedido={numpedido}
            item={item}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
