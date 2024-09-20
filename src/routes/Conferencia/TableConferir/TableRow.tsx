import { TableForm } from "./TableForm";
import { GetIconStatus, GetStatus } from "./Utils";
import { Call } from "./TableContext";
import { Badge } from "@/components/ui/badge";
import { GetListItemDtoResponse } from "@/services/Querys/Item/GetListItem";

export type RowTableProps = {
  item: GetListItemDtoResponse;
  call: Call;
};

export function TableRow({ item, call }: RowTableProps) {
  // const isSeparado = item.situacao_separacao_item != null;
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
      className={`grid grid-rows-[auto_fit-content(100%)] grid-cols-[1.3em_1.5em_7em_1fr_5em] gap-x-2 gap-y-0 p-2 border-b-2 ${borderError}`}
    >
      <GetIconStatus status={call.status} failureCount={call.failureCount} />
      <div className="col-span-3 flex items-center justify-left">
        {item.descricao_item}
      </div>
      <div className="w-full flex items-center justify-end">
        {item.qtd_conferencia ?? (
          <Badge className="" variant={"destructive"}>
            Vazio
          </Badge>
        )}
      </div>
      <div className="col-span-2 flex items-center">{item.codproduto}</div>
      <div className="flex items-center justify-center">3662110000</div>
      <div className="flex col-span-2 gap-2 relative items-center">
        <TableForm idseparacao_item={item.idseparacao_item} call={call} />
      </div>
    </div>
  );
}
