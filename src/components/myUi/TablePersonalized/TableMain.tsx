import { SearchTable } from "./SearchTable";
import { DataTable } from "./DataTable";
import { DialogConfirm } from "../DialogConfirm/DialogConfirm";

export interface TablePProps {}

export function TableMain({}: TablePProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <SearchTable />
      <DataTable />
      <div className="p-2 flex justify-end">
        <DialogConfirm>
          {/* <Button variant={"default"}>
            Confirmar
          </Button> */}
        </DialogConfirm>
      </div>
    </div>
  );
}
