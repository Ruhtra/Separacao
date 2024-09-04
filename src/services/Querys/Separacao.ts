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
  data_inicio_separacao?: Date;
  idoperador?: number;
  situacao_separacao?: string;
  data_fim_separacao?: Date;
  qtd_produtos?: number;
  qtd_itens?: number;
};

export function useGetSeparacao(request: GetSeparacaoDtoRequest) {
  const query = useQuery<GetSeparacaoDtoResponse>({
    queryKey: ["separacao", request],
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
