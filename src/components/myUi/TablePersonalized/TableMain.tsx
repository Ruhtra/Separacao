import { Button } from "@/components/ui/button";
import { SearchTable } from "./SearchTable";
import { DataTable } from "./DataTable";

export interface TablePProps {}

export function TableMain({}: TablePProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <SearchTable />
      <DataTable />
      <div className="p-2 flex justify-end">
        <Button variant={"default"}>Confirmar</Button>
      </div>
    </div>
  );
}
