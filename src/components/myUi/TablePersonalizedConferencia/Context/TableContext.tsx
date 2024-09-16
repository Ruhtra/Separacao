import {
  GetListItemDtoResponse,
  PostConfirmItemConferenciaDtoRequest,
  useConfirmItemConferencia,
} from "@/services/Querys/Items";
import { UseMutationResult } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

//DTO
interface TableContextType {
  idOperador: string;
  numpedido: string;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  toogleFilter: boolean;
  setToogleFilter: React.Dispatch<React.SetStateAction<boolean>>;

  filteredItems: GetListItemDtoResponse[];
  itens: GetListItemDtoResponse[];

  calls: Call[];
}
type TableProps = {
  children: ReactNode;
  idOperador: string;
  numpedido: string;

  itens: GetListItemDtoResponse[];
};

export const TableContext = createContext<TableContextType>(
  {} as TableContextType
);

export type Call = UseMutationResult<
  void,
  any,
  PostConfirmItemConferenciaDtoRequest,
  unknown
>;

//MAIN
export function TableProvider({
  itens,
  children,
  idOperador,
  numpedido,
}: TableProps) {
  //filtro
  const [inputText, setInputText] = useState<string>("");
  const [toogleFilter, setToogleFilter] = useState<boolean>(false);

  const filteredItems = itens.filter((i) => {
    const matchesCodigoFornecedor = i.codproduto.toString().includes(inputText);
    if (toogleFilter)
      return matchesCodigoFornecedor && i.qtd_conferencia === null;
    return matchesCodigoFornecedor;
  });

  //funções para confirmar
  const calls = itens.map(() => {
    return useConfirmItemConferencia(numpedido);
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

        calls,
        idOperador,
        numpedido,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
