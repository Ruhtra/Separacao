import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../Api";
import { queryClient } from "../QueryClient";
import { toast } from "sonner";

export interface GetListItemDtoRequest {
  numpedido?: string;
}

export interface GetListItemDtoResponse {
  idseparacao_item: number;
  numpedido: number;
  codproduto: number;
  descricao_item?: string;
  unidade?: string;
  embalagem?: string;
  codigo_fornecedor?: string;
  codigo_barra?: string;
  qtd: number;
  qtd_separada?: number;
  qtd_conferencia?: number;
  situacao_separacao_item?: string;
  data_hora_separacao?: Date;
}

const PathUrl = "Item";

export function useGetListItem(request: GetListItemDtoRequest) {
  const query = useQuery<GetListItemDtoResponse[]>({
    queryKey: ["itemList", request.numpedido],
    queryFn: async () => {
      const response = await api.get<GetListItemDtoResponse[]>(
        `${PathUrl}/GetListItem`,
        {
          params: request,
        }
      );

      // Transformar os dados para minúsculas
      const transformedData = response.data.map((item) => {
        const transformedItem: any = {};
        for (const [key, value] of Object.entries(item)) {
          transformedItem[key.toLowerCase()] = value;
        }
        return transformedItem as GetListItemDtoResponse;
      });

      return transformedData;
    },
    staleTime: 1000 * 60, // 1 minuto
    enabled: false,
    retry: 10 * 1000,
  });

  return query;
}

export interface PostConfirmItemDtoRequest {
  idseparacao_item: number;
  qtd: number;
}

export function useConfirmItem(numpedido: string) {
  return useMutation({
    mutationFn: async (item: PostConfirmItemDtoRequest) => {
      await api.post(`${PathUrl}/PostConfirmItem`, item);
    },
    retry: Infinity,
    // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retryDelay: 10 * 1000,
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<GetListItemDtoResponse[]>(
        ["itemList", numpedido],
        (oldData) => {
          if (!oldData) return [];

          // Find and update the specific item
          return oldData.map((listItem) =>
            listItem.idseparacao_item === variables.idseparacao_item
              ? {
                  ...listItem,
                  qtd_separada: variables.qtd,
                  situacao_separacao_item: "sim",
                }
              : listItem
          );
        }
      );
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

export interface PostLackingItemDtoRequest {
  idseparacao_item: number;
  qtd: number;
}

//TO-DO imeplement PostLackingItemDtoRequest

export interface PostConfirmItemConferenciaDtoRequest {
  idseparacao_item: number;
  qtd: number;
  idoperador: string;
}
export function useConfirmItemConferencia(numpedido: string) {
  return useMutation({
    mutationFn: async (item: PostConfirmItemConferenciaDtoRequest) => {
      await api.post(`${PathUrl}/PostConferenciaItem`, item);
    },
    retry: Infinity,
    // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retryDelay: 10 * 1000,
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<GetListItemDtoResponse[]>(
        ["itemList", numpedido],
        (oldData) => {
          if (!oldData) return [];

          // Find and update the specific item
          return oldData.map((listItem) =>
            listItem.idseparacao_item === variables.idseparacao_item
              ? {
                  ...listItem,
                  qtd_conferencia: variables.qtd,
                  // situa: "sim",
                }
              : listItem
          );
        }
      );
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
