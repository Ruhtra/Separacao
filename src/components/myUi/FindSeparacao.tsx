import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export function FindSeparacao() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idOperador");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numpedido = event.target.value;
    setSearchParams({ idOperador, numpedido });
  };
  return (
    <>
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
    </>
  );
}
