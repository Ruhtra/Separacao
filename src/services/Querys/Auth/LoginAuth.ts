import { api } from "@/services/Api";
import { useMutation } from "@tanstack/react-query";
import { PathUrlAuth } from ".";
// import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export type AuthLoginDtoRequest = {
  email?: string;
  password?: string;
};
export type AuthLoginDtoResponse = {
  token: string;
};

export function useAuthLogin() {
  return useMutation({
    mutationFn: async (request: AuthLoginDtoRequest) => {
      const response = await api.post(`${PathUrlAuth}/Login`, request);
      localStorage.setItem("authToken", response.data);
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
