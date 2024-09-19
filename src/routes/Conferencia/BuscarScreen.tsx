import { useContext } from "react";
import { BuscarConferenciaContext } from "./BuscarContext";
import { NavBar } from "@/components/NavBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { TableProvider } from "../ConfererirRoute/TableConferir/Context/TableContext";
import { TableMain } from "../ConfererirRoute/TableConferir/TableMain";
export function BuscarScreen() {
  const { isShowSkeleton, idOperador, dataConferencia, dataItens, numpedido } =
    useContext(BuscarConferenciaContext);

  return (
    <div className="grid grid-rows-[4em_6em_calc(100%-5em-4em-1em)] bg-yellow-200 h-full p-4">
      <NavBar title="Conferir" operador={idOperador} />

      {/* Loading */}
      {isShowSkeleton && (
        <>
          <Skeleton className="bg-gray-500 h-fit">
            <Card className="opacity-0">
              <CardContent className="p-4">
                Numpedido: <br />
                CLiente:
              </CardContent>
            </Card>
          </Skeleton>
          <Skeleton className="bg-gray-500"></Skeleton>
        </>
      )}

      {/* Datas */}
      {/* TODO tratar para quando tiver erro na busca dos itens */}
      {/* TODO tratar mensagem de erro para quando o pedido não é encontrado */}
      {!isShowSkeleton && (
        <>
          <Card className="mb-[1em]">
            <CardContent className="p-4 truncate">
              Numpedido: {dataConferencia?.numpedido}
              <br />
              CLiente: {dataConferencia?.cliente}
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent className="h-full p-2 w-full">
              {dataConferencia && dataItens && dataItens?.length > 0 ? (
                <TableProvider
                  itens={dataItens}
                  idOperador={idOperador}
                  numpedido={numpedido}
                >
                  <TableMain />
                </TableProvider>
              ) : (
                <div className="h-full flex justify-center items-center">
                  <div>Nenhum item encontrado</div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
