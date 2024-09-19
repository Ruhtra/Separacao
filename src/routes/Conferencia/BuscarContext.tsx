import {
  GetConferenciaDtoResponse,
  useGetConferencia,
} from "@/services/Querys/Conferir/GetConferencia";
import {
  GetListItemDtoResponse,
  useGetListItem,
} from "@/services/Querys/Item/GetListItem";
import { createContext, ReactNode } from "react";

//Dtos
export interface BuscarConferenciaProps {
  idOperador: string;
  numpedido: string;
  children: ReactNode;
}

export interface BuscarConferenciaContextType {
  dataConferencia: GetConferenciaDtoResponse | undefined;
  dataItens: GetListItemDtoResponse[] | undefined;
  isShowSkeleton: boolean | null;
  idOperador: string;
  numpedido: string;
}

//Functions
export const BuscarConferenciaContext = createContext(
  {} as BuscarConferenciaContextType
);

export function BuscarConferenciaProvider({
  numpedido,
  children,
  idOperador,
}: BuscarConferenciaProps) {
  const { data: dataConferencia, isLoading: isLoadingConferencia } =
    useGetConferencia(
      {
        numpedido: numpedido,
      },
      true
    );
  const { data: dataItens, isLoading: isLoadingItens } = useGetListItem(
    {
      numpedido: numpedido,
    },
    true
  );

  const isShowSkeleton = isLoadingConferencia || isLoadingItens;

  return (
    <BuscarConferenciaContext.Provider
      value={{
        dataConferencia: dataConferencia,
        dataItens: dataItens,
        isShowSkeleton: isShowSkeleton,
        idOperador: idOperador,
        numpedido: numpedido,
      }}
    >
      {children}
    </BuscarConferenciaContext.Provider>
  );
}
