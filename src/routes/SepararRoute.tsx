import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GetSeparacaoDtoRequest,
  useGetSeparacao,
} from "@/services/Querys/Separacao";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function SepararRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idOperador");

  if (!idOperador) return <h1>IdOperador não encontrado</h1>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numpedido = event.target.value;
    setSearchParams({ idOperador, numpedido });
  };

  const request: GetSeparacaoDtoRequest = {
    NUMPEDIDO: searchParams.get("numpedido") || "",
  };
  const { data, status, refetch } = useGetSeparacao(request);

  const handleSearchClick = async () => {
    await refetch();
  };

  if (status == "loading") return <h1>Carregando separação</h1>;

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
      {!data ? <h2>Vazio</h2> : <div>{JSON.stringify(data)}</div>}
    </>
  );
}
