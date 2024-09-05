import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-2">
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
      <div className="flex flex-col">
        {filteredItems.map((i) => (
          <div
            key={i.codproduto}
            className="grid grid-rows-2 grid-cols-[4em_4em_1fr_4em] gap-3"
          >
            <div className="col-span-3">
              {i.descricao_item} contendo espaço grande demais
            </div>
            <div className="w-fit">
              {i.qtd_separada ?? 0} / {i.qtd}
            </div>
            <div>{i.codproduto}</div>
            <div>{i.embalagem}</div>
            <div className="flex col-span-2 gap-2">
              <Input className="w-14" />
              <Button className="pl-0 pr-0 w-full">Sep</Button>
              <Button className="pl-0 pr-0 w-full">Conf</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
