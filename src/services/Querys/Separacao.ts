import { useQuery } from "@tanstack/react-query";
import { api } from "../Api";
import { toast } from "sonner";
const PathUrl = `/Separacao`;

export type GetSeparacaoDtoRequest = {
  numpedido?: string;
};
export type GetSeparacaoDtoResponse = {
  numpedido: number;
  cliente?: string;
  DATA_INICIO_SEPARACAO?: Date;
  IDOPERADOR?: number;
  SITUACAO_SEPARACAO?: string;
  DATA_FIM_SEPARACAO?: Date;
  QTD_PRODUTOS?: number;
  QTD_ITENS?: number;
};

export function useGetSeparacao(request: GetSeparacaoDtoRequest) {
  const query = useQuery<GetSeparacaoDtoResponse>({
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
  });

  if (query.error) {
    const error = query.error as any;
    const statusCode = error?.response?.status;

    if (statusCode === 404) {
      toast.error("Pedido não encontrado!");
    } else {
      toast.error("Erro desconhecido, contate o suporte!");
    }
  }

  return query;
}
