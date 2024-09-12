import { Button } from "@/components/ui/button";
import { SearchTable } from "./SearchTable";
import { DataTable } from "./DataTable";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { toast } from "sonner";
import { DialogConfirm } from "../DialogConfirm/DialogConfirm";

export interface TablePProps {}

export function TableMain({}: TablePProps) {
  const { calls } = useContext(TableContext);
  const handleFinalizar = () => {
    console.log("entrei");

    const ErroExistente = calls.some(
      (c) => c.status != "success" && c.status != "idle"
    );
    if (ErroExistente)
      return toast.error(
        "Não foi possível enviar pois nem todos os itens foram enviado para o servidor, aguarde até que todos estejam marcados como concluído"
      );
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <SearchTable />
      <DataTable />
      <div className="p-2 flex justify-end">
        <DialogConfirm>
          <Button variant={"default"} onClick={handleFinalizar}>
            Confirmar
          </Button>
        </DialogConfirm>
      </div>
    </div>
  );
}
