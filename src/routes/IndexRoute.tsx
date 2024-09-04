import { useGetListOperador } from "@/services/Querys/Operador";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function IndexRoute() {
  const { data, status } = useGetListOperador();

  if (status == "loading") return <h1>loading</h1>;
  if (status == "error") return <h1>error</h1>;

  return (
    <>
      <div className="h-full bg-gray-500 flex items-center justify-center">
        <Card
          className="
          bg-current
          min-w-[20em]
          flex
          items-censter
          justify-center"
        >
          <CardContent className="p-5 flex flex-col gap-4 items-center">
            <Select>
              <SelectTrigger className="w-[180px] bg-primary text-secondary">
                <SelectValue placeholder="Selecione o Operador" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {data?.map((o) => {
                    return (
                      <SelectItem value={o.idOperador.toString()}>
                        {o.nome}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <Button asChild className="w-fit">
                <Link to={"/separar"}>Separar</Link>
              </Button>
              <Button asChild>
                <Link to={"/conferir"}>Conferir</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
