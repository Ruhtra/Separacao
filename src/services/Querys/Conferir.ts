import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../Api";
import { toast } from "sonner";
const PathUrl = `/Conferencia`;

export type GetConferenciaDtoRequest = {
  numpedido?: string;
};
export type GetConferenciaDtoResponse = {
  numpedido: number;
  cliente?: string;
  data_inicio_separacao?: Date;
  idoperador?: number;
  situacao_separacao?: string;
  data_fim_separacao?: Date;
  qtd_produtos?: number;
  qtd_itens?: number;
};

export function useGetConferencia(request: GetConferenciaDtoRequest) {
  const query = useQuery<GetConferenciaDtoResponse>({
    queryKey: ["conferencia", request],
    queryFn: async () => {
      const response = await api.get<GetConferenciaDtoResponse>(
        `${PathUrl}/GetConferencia`,
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
  return query;
}

export type CompleteConferenciaRequestDto = {
  numpedido: number;
  IdOperador: number;
};

export function useCompleteConferencia() {
  return useMutation({
    mutationFn: async (request: CompleteConferenciaRequestDto) => {
      await api.post(`${PathUrl}/PostComplete`, request);
    },
    retry: false,
    onSuccess: (_data, _variables) => {},

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
