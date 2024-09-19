import { api } from "@/services/Api";
import { useMutation } from "@tanstack/react-query";
import { PathUrlConferencia } from ".";
import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export type CompleteConferenciaRequestDto = {
  numpedido: string;
  idOperador: string;
};

export function useCompleteConferencia() {
  return useMutation({
    mutationFn: async (request: CompleteConferenciaRequestDto) => {
      await api.post(`${PathUrlConferencia}/PostComplete`, request);
    },
    retry: false,
    onSuccess: (_data, _variables) => {},

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
