import { useQuery } from "@tanstack/react-query";
import { PathUrlConferencia } from ".";
import { api } from "@/services/Api";
import { useEffect } from "react";
// import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export type GetConferenciaDtoRequest = {
  numpedido?: string;
};
export type GetConferenciaDtoResponse = {
  numpedido: number;
  cliente?: string;
  data_inicio_separacao?: Date;
  idoperador?: number;
  situacao_separacao?: string;
  data_fim_separacao?: Date;
  qtd_produtos?: number;
  qtd_itens?: number;
};

export function useGetConferencia(
  request: GetConferenciaDtoRequest,
  enabled: boolean
) {
  const query = useQuery<GetConferenciaDtoResponse>({
    queryKey: ["conferencia", request],
    queryFn: async () => {
      const response = await api.get<GetConferenciaDtoResponse>(
        `${PathUrlConferencia}/GetConferencia`,
        {
          params: request,
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
    enabled: enabled,

    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as any;
      const statusCode = error?.response?.status;

      if (statusCode === 404) {
        // ToastCloseButton({ description: "Pedido Não encontrado!" });
      } else {
        // ToastCloseButton({
        //   description: "Erro desconhecido, contate o suporte",
        // });
      }
    }
  }, [query.error]);

  return query;
}
