import { useQuery } from "@tanstack/react-query";
import { PathUrlItem } from ".";
import { api } from "@/services/Api";

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

export function useGetListItem(
  request: GetListItemDtoRequest,
  enabled: boolean
) {
  const query = useQuery<GetListItemDtoResponse[]>({
    queryKey: ["itemList", request.numpedido],
    queryFn: async () => {
      const response = await api.get<GetListItemDtoResponse[]>(
        `${PathUrlItem}/GetListItem`,
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
    enabled: enabled,
    retry: 10 * 1000,
  });

  return query;
}
