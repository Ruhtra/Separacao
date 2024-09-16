import { SearchTable } from "./SearchTable";
import { DataTable } from "./DataTable";
import { DialogConfirmTable } from "./DialogConfirm/DialogConfirmTable";

export interface TableProps {}

export function TableMain({}: TableProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <SearchTable />
      <DataTable />
      <div className="p-2 flex justify-end">
        <DialogConfirmTable />
      </div>
    </div>
  );
}
