import { useSearchParams } from "react-router-dom";

import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import {
  GetListItemDtoResponse,
  useGetListItem,
} from "@/services/Querys/Item/GetListItem";
import { NavBar } from "@/components/NavBar";

const getStatusSituacao = (
  qtd: number,
  qtd_separada: number | undefined,
  qtd_conferencia: number | undefined
): string => {
  let mc = "x";
  let ms = "x";

  if (qtd !== qtd_conferencia) mc = "c";
  if (qtd !== qtd_separada) ms = "s";

  if (qtd_conferencia === null && qtd_separada === null) return "nn";

  return mc + ms;
};

const getSituacao = (item: GetListItemDtoResponse): string => {
  const status = getStatusSituacao(
    item.qtd,
    item.qtd_separada,
    item.qtd_conferencia
  );

  switch (status) {
    case "xx":
      return "Tudo Okay";
    case "cx":
      return "Conferência divergente";
    case "xs":
      return "Separação divergente";
    case "cs":
      return "Conferência e Separacação divergentes";
    case "nn":
      return "Produto vazio";
    default:
      return "erro ao identififcar o tipo, contate o suporte";
  }
};

const getColor = (item: GetListItemDtoResponse): string => {
  const status = getStatusSituacao(
    item.qtd,
    item.qtd_separada,
    item.qtd_conferencia
  );
  switch (status) {
    case "xx":
      return "bg-green-100";
    case "cx":
      return "bg-red-100";
    case "xs":
      return "bg-yellow-100";
    case "cs":
      return "bg-red-100";
    case "nn":
      return "bg-blue-100";
    default:
      return "";
  }
};

const getIcon = (color: string) => {
  switch (color) {
    case "bg-red-100":
      return <AlertCircle className="w-6 h-6 text-red-500" />;
    case "bg-yellow-100":
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    case "bg-green-100":
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    case "bg-blue-100":
      return <HelpCircle className="w-6 h-6 text-blue-500" />;
    default:
      return null;
  }
};

export type StatusRouteProps = {};
export function StatusRoute({}: StatusRouteProps) {
  const [searchParams, _setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idoperador");
  const numpedido = searchParams.get("numpedido");
  if (!numpedido || !idOperador) return <h1>Informações estão faltando</h1>;

  const { data, isLoading } = useGetListItem(
    {
      numpedido: numpedido,
    },
    true
  );

  if (isLoading) return <h2>Loading...</h2>;
  if (data?.length === 0) return <h2>Nenhum item encontrado</h2>;

  return (
    <div>
      <NavBar operador={idOperador} title="Show" />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Cod</th>
            <th className="p-2 text-left">Qtd.</th>
            <th className="p-2 text-left">Sep.</th>
            <th className="p-2 text-left">Conf.</th>
            <th className="p-2 text-left">Situação</th>
            <th className="p-2 text-left">Icon</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, _index) => {
            const color = getColor(item);
            return (
              <>
                <tr>
                  <td colSpan={5} className={`p-2 ${color}`}>
                    {item.descricao_item}
                  </td>
                  <td rowSpan={2} className={`p-2 ${color}`}>
                    {getIcon(color)}
                  </td>
                </tr>
                <tr>
                  <td className={`p-2 ${color}`}>{item.codproduto}</td>
                  <td className={`p-2 ${color}`}>{item.qtd}</td>
                  <td className={`p-2 ${color}`}>{item.qtd_separada}</td>
                  <td className={`p-2 ${color}`}>{item.qtd_conferencia}</td>
                  <td className={`p-2 ${color}`}>{getSituacao(item)}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
