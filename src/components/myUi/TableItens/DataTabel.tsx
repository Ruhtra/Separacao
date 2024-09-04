"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const [switchChecked, setSwitchChecked] = useState<boolean>(false);

  return (
    <div className="h-full grid grid-rows-[auto_90%_auto] gap-2 py-4 ">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar pelo Código do produto"
          value={
            (table.getColumn("codproduto")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("codproduto")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* <Button> */}
        <label
          htmlFor="onlyNull"
          className="flex gap-2 items-center justify-center cursor-pointer"
        >
          <Switch
            id="onlyNull"
            checked={switchChecked}
            onCheckedChange={() => {
              setSwitchChecked(!switchChecked);
              table
                .getColumn("situacao_separacao_item")
                ?.setFilterValue(switchChecked ? "" : null);
            }}
          />
          Apenas items em separação
        </label>
        {/* </Button> */}
      </div>
      <div className="rounded-md border h-full">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="flex">
        <Button>Confirmar</Button>
      </div>
    </div>
  );
}
