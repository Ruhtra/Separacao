import { useQuery } from "@tanstack/react-query";
import { PathUrlSeparacao } from ".";
import { api } from "@/services/Api";

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
        `${PathUrlSeparacao}/GetNextQueue`,
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
