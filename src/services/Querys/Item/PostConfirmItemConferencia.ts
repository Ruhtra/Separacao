import { api } from "@/services/Api";
import { useMutation } from "@tanstack/react-query";
import { PathUrlItem } from ".";
import { queryClient } from "@/services/QueryClient";
import { GetListItemDtoResponse } from "./GetListItem";
// import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export interface PostConfirmItemConferenciaDtoRequest {
  idseparacao_item: number;
  qtd: number;
  idoperador: string;
}
export function useConfirmItemConferencia(numpedido: string) {
  return useMutation({
    mutationFn: async (item: PostConfirmItemConferenciaDtoRequest) => {
      await api.post(`${PathUrlItem}/PostConferenciaItem`, item);
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
        // ToastCloseButton({
        //   description: "Erro desconhecido, contate o suporte",
        // });
      }
    },
  });
}
