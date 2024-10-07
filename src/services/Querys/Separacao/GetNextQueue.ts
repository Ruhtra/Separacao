import { useQuery } from "@tanstack/react-query";
import { PathUrlSeparacao } from ".";
import { api } from "@/services/Api";
import { useEffect } from "react";
import { toast } from "sonner";

export type GetNextQueueDtoRequest = {
  idOperador?: string;
};

export type GetNextQueueDtoResponse = {
  numpedido?: number;
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
    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as any;
      const statusCode = error?.response?.status;

      if (statusCode === 404) {
        toast.error("Nenhum pedido encontrado!");
      } else {
        toast.error("Erro desconhecido, contate o suporte!");
      }
    }
  }, [query.error]);

  return query;
}
