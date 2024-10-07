import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  GetListItemDtoResponse,
  useGetListItem,
} from "@/services/Querys/Item/GetListItem";

function getStatusSituacao(
  qtd: number,
  qtd_separada: number | undefined,
  qtd_conferencia: number | undefined
) {
  let mc = "x";
  let ms = "x";

  if (qtd !== qtd_conferencia) mc = "c";
  if (qtd !== qtd_separada) ms = "s";

  if (qtd_conferencia === null && qtd_separada === null) return "nn";

  return mc + ms;
}

function getSituacao(item: GetListItemDtoResponse) {
  const status = getStatusSituacao(
    item.qtd,
    item.qtd_separada,
    item.qtd_conferencia
  );

  switch (status) {
    case "xx":
      return "Tudo Okay";
    case "cx":
      return "Conferência divergente";
    case "xs":
      return "Separação divergente";
    case "cs":
      return "Conferência e Separação divergentes";
    case "nn":
      return "Produto vazio";
    default:
      return "Erro ao identificar o tipo, contate o suporte";
  }
}

function getColor(item: GetListItemDtoResponse) {
  const status = getStatusSituacao(
    item.qtd,
    item.qtd_separada,
    item.qtd_conferencia
  );
  switch (status) {
    case "xx":
      return "ok";
    case "cx":
      return "error";
    case "xs":
      return "warning";
    case "cs":
      return "error";
    case "nn":
      return "blue";
    default:
      return "";
  }
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "ok":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "blue":
      return <HelpCircle className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
}

function ItemCard({ item }: { item: GetListItemDtoResponse }) {
  const status = getColor(item);
  const situacao = getSituacao(item);

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-1 truncate">
              {item.descricao_item}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              Código: {item.codproduto}
            </p>
            <div className="flex justify-between text-xs">
              <div>
                <span className="font-medium">Qtd:</span> {item.qtd}
              </div>
              <div>
                <span className="font-medium">Sep:</span>{" "}
                {item.qtd_separada ?? "N/A"}
              </div>
              <div>
                <span className="font-medium">Conf:</span>{" "}
                {item.qtd_conferencia ?? "N/A"}
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <Badge
              variant={
                status === "ok"
                  ? "default"
                  : status === "error"
                  ? "destructive"
                  : "outline"
              }
              className="ml-2 text-xs"
            >
              {situacao}
            </Badge>
            <StatusIcon status={status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ShowRoute() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const {
    data: items,
    isLoading,
    isError,
  } = useGetListItem(
    {
      numpedido: orderNumber,
    },
    true
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
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

  if (!items || items.length === 0) {
    return (
      <Alert variant="warn" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Nenhum item encontrado</AlertTitle>
        <AlertDescription>
          Não há itens para exibir neste pedido.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="w-full">
                <h2 className="text-lg font-semibold truncate  sm:max-w-none">
                  Order: #{orderNumber}
                </h2>
                {/* <p className="text-sm text-muted-foreground">
                Order: {orderNumber}
                </p> */}
              </div>
              <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <ScrollArea className="h-full px-4 py-6">
          <div className="container space-y-3 mx-auto">
            {items.map((item: GetListItemDtoResponse) => (
              <ItemCard key={item.codproduto} item={item} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
