import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { GetListItemDtoResponse } from "@/services/Querys/Items";
import { useState } from "react";

export interface TablePProps {
  itens: GetListItemDtoResponse[];
}

export function TableP({ itens }: TablePProps) {
  const [inputText, setInputText] = useState<string>("");
  const [toogleFilter, setToogleFilter] = useState<boolean>(false);

  const filteredItems = itens.filter((i) => {
    const matchesCodigoFornecedor = i.codproduto.toString().includes(inputText);

    if (toogleFilter) {
      return matchesCodigoFornecedor && i.situacao_separacao_item === null;
    }

    return matchesCodigoFornecedor;
  });

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Buscar pelo Código"
          className="max-w-[12em]"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <label
          htmlFor="onlyNull"
          className="flex gap-2 items-center justify-center cursor-pointer"
        >
          <Switch
            id="onlyNull"
            checked={toogleFilter}
            onCheckedChange={() => {
              setToogleFilter(!toogleFilter);
            }}
          />
          Apenas em separação
        </label>
      </div>
      <ScrollArea className="flex-grow rounded-md border">
        <div className="p-4">
          {filteredItems.map((i) => (
            <div
              key={i.codproduto}
              className="grid grid-rows-2 grid-cols-[4em_4em_1fr_4em] gap-3"
            >
              <div className="col-span-3">{i.descricao_item}</div>
              <div className="w-fit">
                {i.qtd_separada ?? 0} / {i.qtd}
              </div>
              <div>{i.codproduto}</div>
              <div>{i.embalagem}</div>
              <div className="flex col-span-2 gap-2 relative">
                {i.situacao_separacao_item == null ? (
                  <>
                    <Input className="w-14" />
                    <Button className="pl-0 pr-0 w-full">Parc.</Button>
                    <Button className="pl-0 pr-0 w-full">Comp.</Button>
                  </>
                ) : (
                  <Badge className=" absolute bg-green-400 right-0 text-2xs hover:bg-green-400">
                    Separado
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 flex justify-end">
        <Button variant={"default"}>Confirmar</Button>
      </div>
    </div>
  );
}
