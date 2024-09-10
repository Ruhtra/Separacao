import { GetListItemDtoResponse } from "@/services/Querys/Items";
import { createContext, ReactNode, useState } from "react";

interface TableContextType {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  toogleFilter: boolean;
  setToogleFilter: React.Dispatch<React.SetStateAction<boolean>>;

  filteredItems: GetListItemDtoResponse[];
  itens: GetListItemDtoResponse[];
}
type TableProps = {
  children: ReactNode;
  itens: GetListItemDtoResponse[];
};

export const TableContext = createContext<TableContextType>(
  {} as TableContextType
);

export function TableProvider({ itens, children }: TableProps) {
  const [inputText, setInputText] = useState<string>("");
  const [toogleFilter, setToogleFilter] = useState<boolean>(false);

  const filteredItems = itens.filter((i) => {
    const matchesCodigoFornecedor = i.codproduto.toString().includes(inputText);
    if (toogleFilter)
      return matchesCodigoFornecedor && i.situacao_separacao_item === null;
    return matchesCodigoFornecedor;
  });

  return (
    <TableContext.Provider
      value={{
        inputText: inputText,
        setInputText,
        toogleFilter: toogleFilter,
        setToogleFilter,

        filteredItems: filteredItems,
        itens: itens,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
