import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GetSeparacaoDtoRequest,
  useGetSeparacao,
} from "@/services/Querys/Separacao";
import { useSearchParams } from "react-router-dom";

export function SepararRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idOperador");
  if (!idOperador) return <h1>IdOperador não encontrado</h1>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numpedido = event.target.value;
    setSearchParams({ idOperador, numpedido });
  };

  const request: GetSeparacaoDtoRequest = {
    numpedido: searchParams.get("numpedido") || "",
  };
  const { data, isLoading, refetch } = useGetSeparacao(request);
  const handleSearchClick = async () => {
    await refetch();
  };
  if (isLoading) return <h1>Carregando separação</h1>;

  return (
    <>
      <div>
        <Card className="bg-red-500">
          <CardContent className="flex p-4 gap-2">
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
      {}
    </>
  );
}
