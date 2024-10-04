import { api } from "@/services/Api";
import { useMutation } from "@tanstack/react-query";
import { PathUrlSeparacao } from ".";
// import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export type CompleteSeparacaoDtoRequest = {
  numpedido?: string;
  idOperador?: string;
};

export function useCompleteSeparacao() {
  return useMutation({
    mutationFn: async (request: CompleteSeparacaoDtoRequest) => {
      await api.post(`${PathUrlSeparacao}/PostComplete`, request);
    },
    retry: false,
    onSuccess: (_data, _variables) => {},

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
