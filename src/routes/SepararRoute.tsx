import { useSearchParams } from "react-router-dom";
import { TableP } from "@/components/myUi/TablePersonalized/TableP";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetListItemDtoRequest, useGetListItem } from "@/services/Querys/Items";
import {
  GetSeparacaoDtoRequest,
  useGetSeparacao,
} from "@/services/Querys/Separacao";

export function SepararRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idoperador");
  if (!idOperador) return <h1>IdOperador não encontrado</h1>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numpedido = event.target.value;
    setSearchParams({ idoperador: idOperador, numpedido });
  };

  const request: GetSeparacaoDtoRequest = {
    numpedido: searchParams.get("numpedido") || "",
  };
  const requestitem: GetListItemDtoRequest = {
    numpedido: searchParams.get("numpedido") || "",
  };
  const { data, isLoading, refetch } = useGetSeparacao(request);
  const {
    data: itens,
    isLoading: isLoadingItens,
    refetch: refetchItens,
  } = useGetListItem(requestitem);
  const handleSearchClick = async () => {
    await refetch();
    await refetchItens();
  };
  if (isLoading || isLoadingItens) return <h1>Carregando separação</h1>;

  return (
    <div className="grid grid-rows-[auto_auto_80%] grid-cols-1 h-full p-4">
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
      {data && (
        <div>
          <Card>
            <CardContent className="p-4">
              Numpedido: {data.numpedido} <br />
              CLiente: {data.cliente}
            </CardContent>
          </Card>
        </div>
      )}
      {itens && (
        <div className="h-full">
          <Card className="h-full">
            <CardContent className="h-full p-2 w-full">
              <TableP itens={itens} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
