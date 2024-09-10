import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CircleCheckBigIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { InputsTable } from "./InputsTable";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { TableContext } from "./TableContext";

type GetIconStatusProps = {
  status: string;
  failureCount: number;
};
function GetStatus({
  status,
  failureCount,
}: GetIconStatusProps): "error" | "success" | "loading" | undefined {
  if (status === "pending" && failureCount == 0) return "loading";
  if (status === "error" || failureCount >= 1) return "error";
  if (status === "success" || status === "idle") return "success";
}
function GetIconStatus({ status, failureCount }: GetIconStatusProps) {
  return (
    <div className="flex items-center">
      {GetStatus({ status, failureCount }) == "loading" && (
        <LoaderCircleIcon width={"auto"} className="w-full animate-spin" />
      )}
      {GetStatus({ status, failureCount }) == "error" && (
        <TriangleAlertIcon className="text-red-500" />
      )}
      {GetStatus({ status, failureCount }) == "success" && (
        <CircleCheckBigIcon className="text-green-500" />
      )}
    </div>
  );
}

export function DataTable() {
  const { filteredItems, itens, calls } = useContext(TableContext);
  return (
    <ScrollArea className="flex-grow rounded-md border">
      <div className="p-4 ">
        {itens.map((item, index) => {
          //Filtra pelos que não existem
          const prod = filteredItems.find(
            (i) => i.codproduto == item.codproduto
          );
          if (!prod) return null;

          return (
            <div
              key={item.codproduto}
              className={`grid grid-rows-2 grid-cols-[1.5em_4em_4em_1fr_4em] gap-x-2 gap-y-1 p-2 border-b-2 ${
                GetStatus({
                  status: calls[index].status,
                  failureCount: calls[index].failureCount,
                }) == "error"
                  ? "border-b-red-500"
                  : ""
              }`}
            >
              <GetIconStatus
                status={calls[index].status}
                failureCount={calls[index].failureCount}
              />
              <div className="col-span-3 flex items-center">
                {item.descricao_item}
              </div>
              <div className="w-fit flex items-center">
                {item.qtd_separada ?? 0} / {item.qtd}
              </div>
              <div className="col-span-2 flex items-center">
                {item.codproduto}
              </div>
              <div className="flex items-center">{item.embalagem}</div>
              <div className="flex col-span-2 gap-2 relative items-center">
                {item.situacao_separacao_item == null ? (
                  <InputsTable
                    idseparacao_item={item.idseparacao_item}
                    index={index}
                  />
                ) : (
                  <Badge className="bg-green-400 h-fit ml-auto  text-2xs hover:bg-green-400">
                    Separado
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
