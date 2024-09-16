import { useSearchParams } from "react-router-dom";
import { TableMain } from "@/components/myUi/TablePersonalizedConferencia/TableMain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetListItemDtoRequest, useGetListItem } from "@/services/Querys/Items";
import {
  useGetConferencia,
  // useCompleteConferencia,
  GetConferenciaDtoRequest,
} from "@/services/Querys/Conferir";
import { Skeleton } from "@/components/ui/skeleton";
import { TableProvider } from "@/components/myUi/TablePersonalizedConferencia/Context/TableContext";

export function ConferirRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idoperador");
  if (!idOperador) return <h1>IdOperador não encontrado</h1>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numpedido = event.target.value;
    setSearchParams({ idoperador: idOperador, numpedido });
  };

  const request: GetConferenciaDtoRequest = {
    numpedido: searchParams.get("numpedido") || "",
  };
  const requestitem: GetListItemDtoRequest = {
    numpedido: searchParams.get("numpedido") || "",
  };
  const { data, isLoading, refetch } = useGetConferencia(request);
  const {
    data: itens,
    isLoading: isLoadingItens,
    refetch: refetchItens,
  } = useGetListItem(requestitem);
  const handleSearchClick = async () => {
    await refetch();
    await refetchItens();
  };

  return (
    <div className="grid grid-rows-[5em_6em_calc(100%-11em)] bg-yellow-200 h-full p-4">
      <div>
        <Card className="">
          <CardContent className="flex p-4 gap-2 justify-center items-center">
            <label htmlFor="numpedido">Numpedido</label>
            <Input
              type="text"
              value={searchParams.get("numpedido") || ""}
              onChange={handleInputChange}
            />
            <Button onClick={handleSearchClick}>Buscar</Button>
          </CardContent>
        </Card>
      </div>
      {isLoading || isLoadingItens ? (
        <Skeleton className="bg-gray-500 h-fit">
          <Card className="opacity-0">
            <CardContent className="p-4">
              Numpedido: <br />
              CLiente:
            </CardContent>
          </Card>
        </Skeleton>
      ) : (
        data && (
          <div>
            <Card>
              <CardContent className="p-4">
                Numpedido: {data.numpedido} <br />
                CLiente: {data.cliente}
              </CardContent>
            </Card>
          </div>
        )
      )}
      {isLoading || isLoadingItens ? (
        <Skeleton className="bg-gray-500"></Skeleton>
      ) : (
        itens &&
        data && (
          <div>
            <Card className="h-full">
              <CardContent className="h-full p-2 w-full">
                {itens.length > 0 ? (
                  <TableProvider
                    itens={itens}
                    idOperador={idOperador}
                    numpedido={searchParams.get("numpedido") || ""}
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
          </div>
        )
      )}
    </div>
  );
}
