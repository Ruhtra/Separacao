import { api } from "@/services/Api";
import { useMutation } from "@tanstack/react-query";
import { PathUrlAuth } from ".";
import { useAuth } from "@/Contexts/AuthContext";
// import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";

export type AuthLoginDtoRequest = {
  email?: string;
  password?: string;
};
export type AuthLoginDtoResponse = {
  token: string;
};

export function useAuthLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (request: AuthLoginDtoRequest) => {
      const response = await api.post(`${PathUrlAuth}/Login`, request);
      return response.data;
    },
    retry: false,
    onSuccess: (data, _variables) => {
      login(data.token);
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
