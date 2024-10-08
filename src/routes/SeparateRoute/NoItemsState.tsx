import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface NoItemsStateProps {
  orderNumber: string | undefined;
}

export function NoItemsState({ orderNumber }: NoItemsStateProps) {
  return (
    <Alert variant="warn" className="m-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Nenhum item encontrado</AlertTitle>
      <AlertDescription>
        {orderNumber
          ? `Não há itens para separação no pedido ${orderNumber}.`
          : "Não foi possível encontrar o pedido."}
      </AlertDescription>
    </Alert>
  );
}
