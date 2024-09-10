import { Button } from "@/components/ui/button";
import { SearchTable } from "./SearchTable";
import { DataTable } from "./DataTable";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { toast } from "sonner";

export interface TablePProps {}

export function TableMain({}: TablePProps) {
  const { calls } = useContext(TableContext);
  const handleFinalizar = () => {
    console.log("entrei");

    const ErroExistente = calls.some(
      (c) => c.status != "success" && c.status != "idle"
    );
    if (ErroExistente) return toast.error("Nem todos os itens foram enviados");
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      <SearchTable />
      <DataTable />
      <div className="p-2 flex justify-end">
        <Button onClick={handleFinalizar} variant={"default"}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
