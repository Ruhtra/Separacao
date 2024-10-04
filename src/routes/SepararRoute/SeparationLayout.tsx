import { useParams } from "react-router-dom";
import { useGetSeparacao } from "@/services/Querys/Separacao/GetSeparacao";
import { useGetListItem } from "@/services/Querys/Item/GetListItem";
import ItemList from "./ItemList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Navbar } from "@/components/NavBar";

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
      <Navbar title="separar" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pedido #{orderNumber}</h1>
        <p className="mb-4">Cliente: {separacaoQuery.data.cliente}</p>
        <ItemList items={itemListQuery.data} />
      </div>
    </>
  );
}
