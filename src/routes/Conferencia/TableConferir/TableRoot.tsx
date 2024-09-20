import { TableSearch } from "./TableSearch";
import { DataTable } from "./DataTable";
import { DialogConfirmTable } from "./DialogConfirm/DialogConfirmTable";
import { TableProvider } from "./TableContext";
import { BuscarConferenciaContext } from "../BuscarContext";
import { useContext } from "react";

export interface TableProps {}

export function TableRoot({}: TableProps) {
  const { idOperador, dataItens, numpedido, dataConferencia } = useContext(
    BuscarConferenciaContext
  );

  return dataConferencia && dataItens && dataItens?.length > 0 ? (
    <TableProvider
      itens={dataItens}
      idOperador={idOperador}
      numpedido={numpedido}
    >
      <div className="flex flex-col gap-2 h-full">
        <TableSearch />
        <DataTable />
        <div className="p-2 flex justify-end">
          <DialogConfirmTable />
        </div>
      </div>
    </TableProvider>
  ) : (
    <div className="h-full flex justify-center items-center">
      <div>Nenhum item encontrado</div>
    </div>
  );
}
