import { useMutation, useQuery } from "@tanstack/react-query";
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

export type CompleteSeparacaoDtoRequest = {
  numpedido?: string;
  idOperador?: string;
};

export function useCompleteSeparacao() {
  return useMutation({
    mutationFn: async (request: CompleteSeparacaoDtoRequest) => {
      await api.post(`${PathUrl}/PostComplete`, request);
    },
    retry: false,
    onSuccess: (_data, _variables) => {},

    onError: (error: any) => {
      const statusCode = error?.response?.status;
      // Mantém o status como "error" para mostrar o ícone de erro
      if (statusCode == 200) {
        console.log("enviado");
      } else {
        toast.error("ERRO! contate o suporte");
      }
    },
  });
}

export type GetNextQueueDtoRequest = {
  idOperador?: string;
};

export type GetNextQueueDtoResponse = {
  numpedido?: string;
};

export function useGetNextQueue(request: GetNextQueueDtoRequest) {
  const query = useQuery<GetNextQueueDtoResponse>({
    queryKey: ["numpedido", request.idOperador],
    queryFn: async () => {
      const response = await api.get<GetNextQueueDtoResponse>(
        `${PathUrl}/GetNextQueue`,
        {
          params: request,
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
    retryDelay: 15 * 1000,
    retry: true,
  });

  // if (query.error) {
  //   const error = query.error as any;
  //   const statusCode = error?.response?.status;

  //   if (statusCode === 404) {
  //     toast.error("Nenhum pedido encontrado!");
  //   } else {
  //     toast.error("Erro desconhecido, contate o suporte!");
  //   }
  // }

  return query;
}
