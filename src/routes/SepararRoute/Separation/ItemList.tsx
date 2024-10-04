import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ItemListProps {
  items: GetListItemDtoResponse[];
}
type ItemQuantity = {
  [key: string]: number;
};
export default function ItemList({ items }: ItemListProps) {
  const [confirmedQuantities, setConfirmedQuantities] = useState<ItemQuantity>(
    {}
  );
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: ItemQuantity) => {
    setConfirmedQuantities(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow overflow-hidden"
    >
      <ScrollArea className="h-full px-4 py-6">
        <div className="container mx-auto space-y-4">
          {items.map((item) => (
            <Card key={item.idseparacao_item}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      {item.descricao_item}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      ID: {item.idseparacao_item}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Code: {item.codigo_barra}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Packaging: {item.embalagem}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Controller
                      name={item.idseparacao_item.toString()}
                      control={control}
                      defaultValue=""
                      rules={{ required: true, min: 0 }}
                      render={({ field, fieldState: { error } }) => (
                        <div className="flex-grow sm:flex-grow-0">
                          <Input
                            {...field}
                            type="number"
                            placeholder="Qty"
                            className={`w-full sm:w-20 ${
                              error ? "border-destructive" : ""
                            }`}
                          />
                          {error && (
                            <p className="text-xs text-destructive mt-1">
                              Invalid quantity
                            </p>
                          )}
                        </div>
                      )}
                    />
                    <Button
                      type="button"
                      className="w-full sm:w-auto"
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
                {confirmedQuantities[item.idseparacao_item] !== undefined && (
                  <p className="text-xs sm:text-sm text-green-600 mt-2">
                    Confirmed quantity:{" "}
                    {confirmedQuantities[item.idseparacao_item]}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </form>
  );
}
