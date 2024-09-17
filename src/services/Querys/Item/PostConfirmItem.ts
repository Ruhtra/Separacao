import { api } from "@/services/Api";
import { useMutation } from "@tanstack/react-query";
import { PathUrlItem } from ".";
import { queryClient } from "@/services/QueryClient";
import { GetListItemDtoResponse } from "./GetListItem";
import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export interface PostConfirmItemDtoRequest {
  idseparacao_item: number;
  qtd: number;
}

export function usePostConfirmItem(numpedido: string) {
  return useMutation({
    mutationFn: async (item: PostConfirmItemDtoRequest) => {
      await api.post(`${PathUrlItem}/PostConfirmItem`, item);
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
        ToastCloseButton({
          description: "Erro desconhecido, contate o suporte",
        });
      }
    },
  });
}
