import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GetConferenciaDtoRequest,
  useGetConferencia,
} from "@/services/Querys/Conferir/GetConferencia";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BuscarConferenciaRoute() {
  const navigate = useNavigate();
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

  const {
    data: _data,
    isLoading,
    refetch,
    status,
  } = useGetConferencia(request, false);
  const handleSearchClick = async () => {
    await refetch();
  };

  useEffect(() => {
    if (status == "success")
      //   TO-DO remove numpedido for here
      navigate(
        `./conferencia?idoperador=${idOperador}&numpedido=${
          searchParams.get("numpedido") || ""
        }`
      );
  }, [status]);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="grid grid-rows-[4em_5em_6em_calc(100%-5em-6em-3em)] bg-yellow-200 h-full p-4">
      <NavBar title="Conferir" operador={idOperador} />
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
    </div>
  );
}
