"use client";

import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ItemCard } from "./ItemCard";
import { useSeparationContext } from "./CheckContext";

interface FilteredItemListProps {
  numpedido: string;
}

export function ItemList({ numpedido }: FilteredItemListProps) {
  const { items } = useSeparationContext();
  const [showConferidos, setShowConferidos] = useState(false);
  const [barcodeFilter, setBarcodeFilter] = useState("");

  const filteredItems = items.filter((item) => {
    const conferidosFilter = showConferidos
      ? item.qtd_conferencia == null
      : true;
    const barcodeMatch = barcodeFilter
      ? item.codigo_barra === barcodeFilter
      : true;
    return conferidosFilter && barcodeMatch;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="container p-4 bg-background shadow-md mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Filter by Barcode"
            value={barcodeFilter}
            onChange={(e) => setBarcodeFilter(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-conferidos"
            checked={showConferidos}
            onCheckedChange={setShowConferidos}
          />
          <Label htmlFor="show-conferidos">Não Conferidos</Label>
        </div>
      </div>
      <ScrollArea className="flex-grow px-4 py-6">
        <div className="container mx-auto space-y-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.idseparacao_item}
              numpedido={numpedido}
              item={item}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
