import { Badge } from "@/components/ui/badge";
import { InputsTable } from "./InputsTable";
import { GetIconStatus, GetStatus } from "./Utils";
import { GetListItemDtoResponse } from "@/services/Querys/Items";
import { Call } from "./Context/TableContext";

export type RowTableProps = {
  item: GetListItemDtoResponse;
  call: Call;
};

export function RowTable({ item, call }: RowTableProps) {
  const isSeparado = item.situacao_separacao_item != null;
  const borderError =
    GetStatus({
      status: call.status,
      failureCount: call.failureCount,
    }) == "error"
      ? "border-b-red-500"
      : "";

  return (
    <div
      key={item.codproduto}
      className={`grid grid-rows-[auto_fit-content(100%)] grid-cols-[1.3em_4em_4em_1fr_5em] gap-x-2 gap-y-0 p-2 border-b-2 ${borderError}`}
    >
      <GetIconStatus status={call.status} failureCount={call.failureCount} />
      <div className="col-span-3 flex items-center justify-left">
        {item.descricao_item}
      </div>
      <div className="w-fit flex items-start justify-center">
        {item.qtd_separada ?? 0} / {item.qtd}
      </div>
      <div className="col-span-2 flex items-center">{item.codproduto}</div>
      <div className="flex items-center">{item.embalagem}</div>
      <div className="flex col-span-2 gap-2 relative items-center">
        {isSeparado ? (
          <Badge className="bg-green-400 h-fit ml-auto  text-2xs hover:bg-green-400">
            Separado
          </Badge>
        ) : (
          <InputsTable idseparacao_item={item.idseparacao_item} call={call} />
        )}
      </div>
    </div>
  );
}
