import { useMutation, useQuery } from "react-query";
import { api } from "../Api";
import { toast } from "sonner";
const PathUrl = `/Separacao`;

export type GetSeparacaoDtoRequest = {
  NUMPEDIDO?: string;
};
export type GetSeparacaoDtoResponse = {
  NUMPEDIDO: number;
  CLIENTE?: string;
  DATA_INICIO_SEPARACAO?: Date;
  IDOPERADOR?: number;
  SITUACAO_SEPARACAO?: string;
  DATA_FIM_SEPARACAO?: Date;
  QTD_PRODUTOS?: number;
  QTD_ITENS?: number;
};

export function useGetSeparacao(request: GetSeparacaoDtoRequest) {
  return useQuery<GetSeparacaoDtoResponse>({
    queryKey: ["Separacao", request],
    queryFn: async () => {
      const response = await api.get<GetSeparacaoDtoResponse>(
        `${PathUrl}/GetSeparacao`,
        {
          params: request,
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
    enabled: false,
    retry: false,
    onError: (err: any) => {
      if (err.status == 404) return toast("Pedido não encontrado");
      toast("Erro desconhecido, contate o suporte!");
    },
  });
}
