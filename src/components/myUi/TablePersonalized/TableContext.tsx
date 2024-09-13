import {
  GetListItemDtoResponse,
  PostConfirmItemDtoRequest,
  useConfirmItem,
} from "@/services/Querys/Items";
import { UseMutationResult } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";
interface TableContextType {
  idOperador: string;
  numpedido: string;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  toogleFilter: boolean;
  setToogleFilter: React.Dispatch<React.SetStateAction<boolean>>;

  filteredItems: GetListItemDtoResponse[];
  itens: GetListItemDtoResponse[];

  calls: UseMutationResult<void, any, PostConfirmItemDtoRequest, unknown>[];
  //   onSubmitConfirmItem: ((
  //     idseparacaoItem: number,
  //     index: number
  //   ) => (data: z.infer<typeof FormSchema>) => void)[];
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

export function TableProvider({
  itens,
  children,
  idOperador,
  numpedido,
}: TableProps) {
  console.log(numpedido);

  const [inputText, setInputText] = useState<string>("");
  const [toogleFilter, setToogleFilter] = useState<boolean>(false);

  const filteredItems = itens.filter((i) => {
    const matchesCodigoFornecedor = i.codproduto.toString().includes(inputText);
    if (toogleFilter)
      return matchesCodigoFornecedor && i.situacao_separacao_item === null;
    return matchesCodigoFornecedor;
  });

  const calls = itens.map(() => {
    return useConfirmItem(numpedido);
  });

  //   const onSubmitConfirmItem = itens.map(() => {
  //     return (idseparacaoItem: number, index: number) => {
  //       return (data: z.infer<typeof FormSchema>) => {
  //         calls[index].mutate({
  //           idseparacao_item: idseparacaoItem,
  //           qtd: data.qtd,
  //         });
  //       };
  //     };
  //   });

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
        // onSubmitConfirmItem,
        idOperador,
        numpedido,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
