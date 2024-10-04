import { api } from "@/services/Api";
import { PathUrlSeparacao } from ".";
import { useQuery } from "@tanstack/react-query";

export type GetSeparacaoDtoRequest = {
  numpedido?: string;
};

export type GetSeparacaoDtoResponse = {
  numpedido: number;
  cliente?: string;
  data_inicio_separacao?: Date;
  idoperador?: number;
  situacao_separacao?: string;
  data_fim_separacao?: Date;
  qtd_produtos?: number;
  qtd_itens?: number;
};

export function useGetSeparacao(
  request: GetSeparacaoDtoRequest,
  enabled: boolean
) {
  const query = useQuery<GetSeparacaoDtoResponse>({
    queryKey: ["separacao", request],
    queryFn: async () => {
      const response = await api.get<GetSeparacaoDtoResponse>(
        `${PathUrlSeparacao}/GetSeparacao`,
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

  // if (query.error) {
  //   const error = query.error as any;
  //   const statusCode = error?.response?.status;

  //   if (statusCode === 404) {
  //     toast.error("Pedido não encontrado!");
  //   } else {
  //     toast.error("Erro desconhecido, contate o suporte!");
  //   }
  // }

  return query;
}
