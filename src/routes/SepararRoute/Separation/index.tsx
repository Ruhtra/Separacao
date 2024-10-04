import { useParams } from "react-router-dom";
import { useGetSeparacao } from "@/services/Querys/Separacao/GetSeparacao";
import { useGetListItem } from "@/services/Querys/Item/GetListItem";
import ItemList from "./ItemList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SeparationLayout() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const separacaoQuery = useGetSeparacao({ numpedido: orderNumber }, true);
  const itemListQuery = useGetListItem(
    { numpedido: orderNumber },
    !!orderNumber
  );

  if (separacaoQuery.isLoading || itemListQuery.isLoading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (separacaoQuery.isError || itemListQuery.isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Ocorreu um erro ao carregar os dados. Por favor, tente novamente.
        </AlertDescription>
      </Alert>
    );
  }

  if (!separacaoQuery.data) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Pedido não encontrado</AlertTitle>
        <AlertDescription>
          Não foi possível encontrar o pedido com o número {orderNumber}.
        </AlertDescription>
      </Alert>
    );
  }

  if (!itemListQuery.data || itemListQuery.data.length === 0) {
    return (
      <Alert variant={"warn"} className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Nenhum item encontrado</AlertTitle>
        <AlertDescription>
          Não há itens para separação neste pedido.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {/* <Navbar title="yes" /> */}
      <div className="flex flex-col h-full">
        {/* Top Section */}
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-lg font-semibold truncate max-w-[200px] sm:max-w-none">
                  Client: {separacaoQuery.data.cliente}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Order: {orderNumber}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Items Section */}
        <ItemList items={itemListQuery.data} />

        {/* Footer Section */}
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Total Items: {itemListQuery.data.length}
              </p>
              <Button type="submit" onClick={() => console.log()}>
                Confirm All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
