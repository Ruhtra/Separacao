import { useSearchParams } from "react-router-dom";
import { BuscarConferenciaProvider } from "./BuscarContext";
import { BuscarScreen } from "./BuscarScreen";

export function ConferenciaRoute() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const idOperador = searchParams.get("idoperador");
  const numpedido = searchParams.get("numpedido");

  if (!numpedido || !idOperador) return <h1>Informações estão faltando</h1>;

  return (
    <BuscarConferenciaProvider
      idOperador={idOperador || ""}
      numpedido={numpedido || ""}
    >
      <BuscarScreen />
    </BuscarConferenciaProvider>
  );
}
