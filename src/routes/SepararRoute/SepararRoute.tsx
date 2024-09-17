import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useGetNextQueue } from "@/services/Querys/Separacao/GetNextQueue";
import {
  GetSeparacaoDtoRequest,
  useGetSeparacao,
} from "@/services/Querys/Separacao/GetSeparacao";
import {
  GetListItemDtoRequest,
  useGetListItem,
} from "@/services/Querys/Item/GetListItem";
import { TableProvider } from "./TableSeparar/Context/TableContext";
import { TableMain } from "./TableSeparar/TableMain";

export function SepararRoute() {
  const [searchParams] = useSearchParams();
  const idOperador = searchParams.get("idoperador");

  if (!idOperador) return <h1>IdOperador não encontrado</h1>;

  const {
    data: dataNextQueue,
    isLoading: isLoadingNextQueue,
    refetch: refetechNextQueue,
  } = useGetNextQueue({ idOperador });
  const numpedido = dataNextQueue?.numpedido || "";

  const request: GetSeparacaoDtoRequest = { numpedido };
  const requestItem: GetListItemDtoRequest = { numpedido };

  const [time, setTime] = useState(15);

  const {
    data: dataSeparacao,
    isLoading: isLoadingSeparacao,
    refetch: refetchSeparacao,
  } = useGetSeparacao(request);

  const {
    data: itens,
    isLoading: isLoadingItens,
    refetch: refetchItens,
  } = useGetListItem(requestItem);

  useEffect(() => {
    if (numpedido) {
      refetchSeparacao();
      refetchItens();
    }
  }, [numpedido, refetchSeparacao, refetchItens]);

  useEffect(() => {
    if (dataNextQueue?.numpedido == "-1") {
      if (time === 0) {
        refetechNextQueue();
        setTime(15);
      } else {
        const intervalId = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      }
    } else {
      setTime(15);
    }
  }, [dataNextQueue, time, refetechNextQueue]);

  const isLoading = isLoadingSeparacao || isLoadingItens || isLoadingNextQueue;
  const showSkeleton = isLoading;

  return (
    <div className="grid grid-rows-[6em_calc(100%-6em)] bg-yellow-200 h-full p-4">
      {/* Cabeçalho com informações do pedido */}
      {showSkeleton ? (
        <Skeleton className="bg-gray-500 h-fit">
          <Card className="opacity-0">
            <CardContent className="p-4">
              Numpedido: <br />
              Cliente:
            </CardContent>
          </Card>
        </Skeleton>
      ) : dataSeparacao != null ? (
        <Card>
          <CardContent className="p-4">
            Numpedido: {dataSeparacao.numpedido} <br />
            Cliente: {dataSeparacao.cliente}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            Nenhum Pedido encontrado <br />
            Tentando novamente em: {time}
          </CardContent>
        </Card>
      )}

      {/* Tabela com itens */}
      {showSkeleton ? (
        <Skeleton className="bg-gray-500"></Skeleton>
      ) : (
        itens && (
          <Card className="h-full">
            <CardContent className="h-full p-2 w-full">
              {itens.length > 0 ? (
                <TableProvider
                  itens={itens}
                  idOperador={idOperador}
                  numpedido={numpedido}
                >
                  <TableMain />
                </TableProvider>
              ) : (
                <div className="h-full flex justify-center items-center">
                  <div>Nenhum item encontrado</div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
