"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";

export type ItemTable = {
  codproduto: string;
  descricao_item?: string;
  embalagem?: string;
  qtd: number;
  qtd_separada?: number;
  situacao_separacao_item?: string;
};

export const columns: ColumnDef<ItemTable>[] = [
  {
    accessorKey: "codproduto",
    header: "Cod",
  },
  {
    accessorKey: "descricao_item",
    header: "Produto",
  },
  {
    accessorKey: "qtd",
    header: "Qtd",
  },
  {
    accessorKey: "situacao_separacao_item",
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === null) return row.getValue(columnId) === null;
      return row.getValue(columnId) !== null;
    },
    header: "",
    enableColumnFilter: false,
    cell: () => null,
  },
  {
    accessorKey: "qtd_separada",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "embalagem",
    header: "Emb",
  },
  {
    id: "action",
    header: "Separar",
    cell: ({ row }) => {
      return (
        <>
          {row.getValue<number>("situacao_separacao_item") == null ? (
            <div className="flex gap-2">
              <Input type="number" className="w-[10em]" />
              <Button>Separar</Button>
              <Button>Comleto</Button>
            </div>
          ) : (
            <h1>Separado</h1>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "conferido",
    header: "Conferido",
    cell: ({ row }) => {
      const qtdSeparada = row.getValue<number>("qtd_separada") ?? 0;
      const qtd = row.getValue<number>("qtd") ?? 0;

      return <div>{`${qtdSeparada} / ${qtd}`}</div>;
    },
  },
];
