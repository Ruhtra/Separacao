import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheckBigIcon } from "lucide-react";
import { InputsTable } from "./InputsTable";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { TableContext } from "./TableContext";

export function DataTable() {
  const { filteredItems } = useContext(TableContext);

  return (
    <ScrollArea className="flex-grow rounded-md border">
      <div className="p-4 ">
        {filteredItems.map((i) => (
          <div
            key={i.codproduto}
            className="grid grid-rows-2 grid-cols-[1em_4em_4em_1fr_4em] gap-3 p-2 border-b-2"
          >
            <div className="flex items-center">
              <CircleCheckBigIcon />
            </div>
            <div className="col-span-3">{i.descricao_item}</div>
            <div className="w-fit">
              {i.qtd_separada ?? 0} / {i.qtd}
            </div>
            <div className="col-span-2">{i.codproduto}</div>
            <div>{i.embalagem}</div>
            <div className="flex col-span-2 gap-2 relative">
              {i.situacao_separacao_item == null ? (
                <InputsTable idseparacao_item={i.idseparacao_item} />
              ) : (
                <Badge className="bg-green-400 h-fit ml-auto  text-2xs hover:bg-green-400">
                  Separado
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
