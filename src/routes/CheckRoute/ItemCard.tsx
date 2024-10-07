import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";
import { useSeparationContext } from "./CheckContext";
import { StatusIcon } from "./Utils";
import { useConfirmItemConferencia } from "@/services/Querys/Item/PostConfirmItemConferencia";
import { useAuth } from "@/Contexts/AuthContext";

const createItemSchema = (maxQuantity: number) =>
  z.object({
    quantity: z
      .number()
      .nonnegative("Quantidade não pode ser negativo")
      .max(maxQuantity, `Quantidade dviergente do pedido`),
  });

interface ItemCardProps {
  item: GetListItemDtoResponse;
  numpedido: string;
}

export function ItemCard({ item, numpedido }: ItemCardProps) {
  const { mutateAsync, status } = useConfirmItemConferencia(numpedido);
  const { updateItemStatus, updateItemConfirmationStatus } =
    useSeparationContext();

  const { idOperador } = useAuth();

  const form = useForm<z.infer<ReturnType<typeof createItemSchema>>>({
    resolver: zodResolver(createItemSchema(item.qtd)),
    defaultValues: {
      quantity: item.qtd_separada,
    },
  });

  const handleSubmit = async (
    values: z.infer<ReturnType<typeof createItemSchema>>
  ) => {
    updateItemConfirmationStatus(item.idseparacao_item, "pending");
    try {
      await mutateAsync({
        qtd: values.quantity,
        idseparacao_item: item.idseparacao_item,
        idoperador: idOperador,
      });
      updateItemStatus(item.idseparacao_item, values.quantity);
      updateItemConfirmationStatus(item.idseparacao_item, "success");
    } catch (error) {
      updateItemConfirmationStatus(item.idseparacao_item, "error");
    }
  };

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="w-full sm:w-auto">
              <h3 className="flex items-center gap-1 font-semibold text-sm sm:text-base mb-2">
                <StatusIcon status={status} />
                <p className="truncate">{item.descricao_item}</p>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>ID: {item.idseparacao_item}</span>
                <span>Code: {item.codigo_barra}</span>
                <span>Packaging: {item.embalagem}</span>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full sm:w-auto mt-4 sm:mt-0"
              >
                <div className="flex flex-col space-y-2">
                  {item.qtd !== undefined && (
                    <p className="text-xs sm:text-sm  order-first sm:order-none sm:text-right">
                      <span className="text-green-600">
                        Conferido: {item.qtd_separada ?? "S/N"}
                      </span>
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-auto">
                        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2">
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="Qty"
                              className="w-full"
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                if (field.value === 0 || field.value == null) {
                                  inputValue = inputValue.replace("0", "");
                                  field.onChange(
                                    e.target.value === ""
                                      ? 0
                                      : Number(inputValue)
                                  );
                                  e.target.value = inputValue;
                                } else {
                                  field.onChange(
                                    e.target.value === ""
                                      ? 0
                                      : Number(inputValue)
                                  );
                                }
                              }}
                              disabled={status === "pending"}
                            />
                          </FormControl>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={status === "pending"}
                          >
                            Confirm
                          </Button>
                        </div>
                        <FormMessage className="text-xs sm:text-sm text-destructive mt-1 sm:text-right" />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
