import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { TableRow } from "./TableRow";

export function DataTable() {
  const { filteredItems, itens, calls } = useContext(TableContext);
  return (
    <ScrollArea className="flex-grow rounded-md border">
      <div className="p-0 ">
        {itens
          .filter((item) =>
            filteredItems.some((i) => i.codproduto === item.codproduto)
          )
          .map((item, index) => (
            <TableRow
              key={item.idseparacao_item}
              item={item}
              call={calls[index]}
            />
          ))}
      </div>
    </ScrollArea>
  );
}
