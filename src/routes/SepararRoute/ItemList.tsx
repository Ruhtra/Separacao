import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ItemListProps {
  items: GetListItemDtoResponse[];
}

export default function ItemList({ items }: ItemListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.idseparacao_item}>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  {item.descricao_item}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Código: {item.codproduto}
                </p>
                <p className="text-xs text-muted-foreground">
                  Embalagem: {item.embalagem}
                </p>
                <p className="text-xs text-muted-foreground">
                  Quantidade: {item.qtd}
                </p>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Input
                  type="number"
                  placeholder="Qtd. Separada"
                  className="w-full sm:w-32"
                  defaultValue={item.qtd_separada || ""}
                />
                <Button>Confirmar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
