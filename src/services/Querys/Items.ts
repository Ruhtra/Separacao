import { useQuery } from "@tanstack/react-query";
import { api } from "../Api";

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
    queryKey: ["itemList", request],
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
    retry: false,
  });

  return query;
}
