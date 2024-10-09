"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ItemCard } from "./ItemCard";
import { useSeparationContext } from "./CheckContext";
import { toast } from "sonner";
import { XCircle, Barcode } from "lucide-react";

interface ItemListProps {
  numpedido: string;
}

export function ItemList({ numpedido }: ItemListProps) {
  const { items } = useSeparationContext();
  const [showConferidos, setShowConferidos] = useState(false);
  const [barcodeFilter, setBarcodeFilter] = useState("");
  const [barcodeBuffer, setBarcodeBuffer] = useState("");
  const [isReadingBarcode, setIsReadingBarcode] = useState(false);

  const handleBarcodeInput = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "%") {
        setIsReadingBarcode(true);
        setBarcodeBuffer("");
      } else if (isReadingBarcode) {
        if (event.key === "+") {
          setIsReadingBarcode(false);
          const newBarcodeFilter = barcodeBuffer.slice(0, -5); // Remove 'Shift' from the end
          setBarcodeFilter(newBarcodeFilter);

          // Check if any items match the new barcode filter
          const matchingItems = items.filter(
            (item) => item.codigo_barra === newBarcodeFilter
          );
          if (matchingItems.length === 0) {
            toast("Nenhum item encontrado.");
          }
        } else {
          setBarcodeBuffer((prev) => prev + event.key);
        }
      }
    },
    [isReadingBarcode, barcodeBuffer, items]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleBarcodeInput);
    return () => {
      document.removeEventListener("keydown", handleBarcodeInput);
    };
  }, [handleBarcodeInput]);

  const filteredItems = items.filter((item) => {
    const conferidosFilter = showConferidos ? item.qtd_conferencia == 0 : true;
    const barcodeMatch = barcodeFilter
      ? item.codigo_barra === barcodeFilter
      : true;
    return conferidosFilter && barcodeMatch;
  });

  const clearFilter = () => {
    setBarcodeFilter("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white shadow-md p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-grow w-full sm:w-auto min-w-0 max-w-[300px]">
              <Input
                type="text"
                placeholder="Filtrar por código de barras"
                value={barcodeFilter}
                onChange={(e) => setBarcodeFilter(e.target.value)}
                className="pr-10 w-full"
              />
              <Barcode
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Button
              onClick={clearFilter}
              variant="outline"
              className="flex-shrink-0 touch-manipulation"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Limpar Filtro
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-conferidos"
                checked={showConferidos}
                onCheckedChange={setShowConferidos}
              />
              <Label htmlFor="show-conferidos">
                Mostrar apenas por zerados
              </Label>
            </div>
            <div className="text-sm text-gray-500">
              {filteredItems.length} itens encontrados
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
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
