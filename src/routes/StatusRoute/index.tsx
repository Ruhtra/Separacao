import { useSearchParams } from "react-router-dom";

export type StatusRouteProps = {};
export function StatusRoute({}: StatusRouteProps) {
  const [searchParams, _setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idoperador");
  const numpedido = searchParams.get("numpedido");

  if (!numpedido || !idOperador) return <h1>Informações estão faltando</h1>;

  return <></>;
}
