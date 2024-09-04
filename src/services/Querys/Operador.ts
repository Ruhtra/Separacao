import { useQuery } from "react-query";
import { api } from "../Api";

export type OperadorModel = {
  idOperador: number;
  nome: string;
  situacaoOperador?: string;
  lojas?: any; //remove any
};

const PathUrl = `/Operador`;

export function useGetListOperador() {
  // Atenção para o modelo que pode estar errado
  // O correto seria ProfileLst
  // Porém é passivel de mudança no back para retoranr todos os dados sem filtro
  return useQuery<OperadorModel[]>({
    queryKey: ["operadorList"],
    queryFn: async () => {
      const response = await api.get<OperadorModel[]>(
        `${PathUrl}/GetListOperador`
      );
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}
