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

const getStatusSituacao = (
  qtd: number,
  qtd_separada: number | undefined,
  qtd_conferencia: number | undefined
): string => {
  if (qtd_conferencia === null && qtd_separada === null) return "nn";
  const mc = qtd !== qtd_conferencia ? "c" : "x";
  const ms = qtd !== qtd_separada ? "s" : "x";
  return mc + ms;
};

const getStatusInfo = (
  status: string
): { message: string; color: string; icon: JSX.Element } => {
  switch (status) {
    case "xx":
      return {
        message: "Tudo Okay",
        color: "green",
        icon: <CheckCircle className="h-5 w-5" />,
      };
    case "cx":
      return {
        message: "Conferência divergente",
        color: "red",
        icon: <AlertCircle className="h-5 w-5" />,
      };
    case "xs":
      return {
        message: "Separação divergente",
        color: "yellow",
        icon: <AlertTriangle className="h-5 w-5" />,
      };
    case "cs":
      return {
        message: "Conferência e Separação divergentes",
        color: "red",
        icon: <AlertCircle className="h-5 w-5" />,
      };
    case "nn":
      return {
        message: "Produto vazio",
        color: "blue",
        icon: <HelpCircle className="h-5 w-5" />,
      };
    default:
      return {
        message: "Erro ao identificar o tipo, contate o suporte",
        color: "gray",
        icon: <AlertCircle className="h-5 w-5" />,
      };
  }
};

export function ItemCard({ item }: { item: GetListItemDtoResponse }) {
  const status = getStatusSituacao(
    item.qtd,
    item.qtd_separada,
    item.qtd_conferencia
  );
  const { message, color, icon } = getStatusInfo(status);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-grow p-4">
            <h3 className="text-sm font-semibold mb-1 truncate">
              {item.descricao_item}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Código: {item.codproduto}
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
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
          <div
            className={`flex items-center justify-between p-2 sm:p-4 bg-${color}-100`}
          >
            <div className="flex items-center">
              <div className={`text-${color}-500 mr-2`}>{icon}</div>
              <Badge
                variant={
                  color === "green"
                    ? "default"
                    : color === "red"
                    ? "destructive"
                    : "outline"
                }
                className="text-xs whitespace-nowrap"
              >
                {message}
              </Badge>
            </div>
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
