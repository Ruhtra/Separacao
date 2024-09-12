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

export type CompleteSeparacaoDtoRequest = {
  numpedido?: string;
  idOperador?: string;
};

export function useCompleteSeparacao() {
  return useMutation({
    mutationFn: async (request: CompleteSeparacaoDtoRequest) => {
      await api.post(`${PathUrl}/PostComplete`, request);
    },
    // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retryDelay: 10 * 1000,
    onSuccess: (_data, _variables) => {
      // queryClient.setQueryData<GetListItemDtoResponse[]>(
      //   ["itemList", "299033173"],
      //   (oldData) => {
      //     if (!oldData) return [];
      //     // Find and update the specific item
      //     return oldData.map((listItem) =>
      //       listItem.idseparacao_item === variables.idseparacao_item
      //         ? {
      //             ...listItem,
      //             qtd_separada: variables.qtd,
      //             situacao_separacao_item: "sim",
      //           }
      //         : listItem
      //     );
      //   }
      // );
    },

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
