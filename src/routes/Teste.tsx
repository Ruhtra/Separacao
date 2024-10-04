import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for items
const items = Array.from({ length: 20 }, (_, i) => ({
  id: `ITEM${i + 1}`,
  code: `CODE${i + 1}`,
  description: `Item ${
    i + 1
  } Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  packagingCode: `PKG${i + 1}`,
}));

type ItemQuantity = {
  [key: string]: number;
};

export default function Teste() {
  const [confirmedQuantities, setConfirmedQuantities] = useState<ItemQuantity>(
    {}
  );
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: ItemQuantity) => {
    setConfirmedQuantities(data);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-lg font-semibold truncate max-w-[200px] sm:max-w-none">
                Client: John Doe
              </h2>
              <p className="text-sm text-muted-foreground">Order: #ORD12345</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Items Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow overflow-hidden"
      >
        <ScrollArea className="h-full px-4 py-6">
          <div className="container mx-auto space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {item.description}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        ID: {item.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Code: {item.code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Packaging: {item.packagingCode}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <Controller
                        name={item.id}
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
                  {confirmedQuantities[item.id] !== undefined && (
                    <p className="text-xs sm:text-sm text-green-600 mt-2">
                      Confirmed quantity: {confirmedQuantities[item.id]}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </form>

      {/* Footer Section */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Total Items: {items.length}
            </p>
            <Button type="submit" onClick={() => handleSubmit(onSubmit)()}>
              Confirm All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
