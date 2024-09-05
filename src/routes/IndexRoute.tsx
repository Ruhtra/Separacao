import { useGetListOperador } from "@/services/Querys/Operador";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function IndexRoute() {
  const { data, isLoading, status } = useGetListOperador();
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;
  if (status === "error") return <h1>Error</h1>;

  const handleSelectChange = (value: string) => {
    setSelectedOperator(value);
    setError(null); // Clear error when a selection is made
  };

  const handleSubmitSeparar = () => {
    if (!selectedOperator) {
      setError("Selecione um operador. É obrigatório.");
      return;
    }
    navigate(`/separar?idoperador=${selectedOperator}`);
  };
  const handleSubmitConferir = () => {
    if (!selectedOperator) {
      setError("Selecione um operador. É obrigatório.");
      return;
    }
    navigate(`/conferir?idoperador=${selectedOperator}`);
  };

  return (
    <>
      <div className="h-full bg-gray-500 flex items-center justify-center">
        <Card className="bg-current min-w-[20em] flex items-center justify-center">
          <CardContent className="p-5 flex flex-col gap-4 items-center">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px] bg-primary text-secondary">
                <SelectValue placeholder="Selecione o Operador" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {data?.map((o) => (
                    <SelectItem
                      key={o.idOperador}
                      value={o.idOperador.toString()}
                    >
                      {o.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-4">
              <Button onClick={handleSubmitSeparar} className="w-fit">
                Separar
              </Button>
              <Button onClick={handleSubmitConferir} className="w-fit">
                Conferir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
