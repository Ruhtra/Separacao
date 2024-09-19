import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode, useContext, useEffect } from "react";
import { TableContext } from "../Context/TableContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetIconStatus, GetStatus } from "../Utils";
import { InternetContext } from "@/Contexts/InternetContext";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";
import { useCompleteConferencia } from "@/services/Querys/Conferir/CompleteConferencia";

export type DialogConfirmProps = {
  children?: ReactNode;
};

export function DialogConfirmTable({}: DialogConfirmProps) {
  const navigate = useNavigate();
  const { itens, calls, idOperador, numpedido } = useContext(TableContext);
  const { isOnline } = useContext(InternetContext);

  const { status, mutate } = useCompleteConferencia();

  const handleFinalizar = () => {
    const ErroExistente = calls.some(
      (c) => c.status != "success" && c.status != "idle"
    );

    if (ErroExistente)
      return ToastCloseButton({
        description:
          "Não foi possível enviar pois nem todos os itens foram enviado para o servidor, aguarde até que todos estejam marcados como concluído",
      });
    if (!isOnline)
      return ToastCloseButton({
        description: "Não é possível separar sem acesso a internet",
      });

    mutate({
      idOperador,
      numpedido,
    });
  };

  useEffect(() => {
    if (status == "success") navigate(0);
  }, [status]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"lg"} variant="default">
            Confirmar
          </Button>
        </DialogTrigger>
        <DialogContent
          className="flex flex-col max-w-[90%]"
          showCloseIcon={true}
        >
          <DialogHeader>
            <DialogTitle>Confirmar separação</DialogTitle>

            <DialogDescription>
              Confirme os itens da separação
            </DialogDescription>
          </DialogHeader>

          {status == "pending" && (
            <div className="w-full h-full absolute inset-0 bg-white z-10 flex justify-center items-center">
              <LoaderCircleIcon size={64} className="w-full animate-spin" />
            </div>
          )}
          <ScrollArea className="bg-primary-foreground ">
            <div className="flex flex-col max-h-[70svh] ">
              {itens.map((e, i) => (
                <div
                  key={e.idseparacao_item}
                  className={`grid grid-cols-[2em_1fr] ${
                    GetStatus({
                      status: calls[i].status,
                      failureCount: calls[i].failureCount,
                    }) == "loading"
                      ? "bg-red-200"
                      : ""
                  }`}
                >
                  <div className="w-full  flex justify-center items-center">
                    <GetIconStatus
                      status={calls[i].status}
                      failureCount={calls[i].failureCount}
                    />
                  </div>
                  {e.descricao_item}
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter className="justify-end">
            <Button onClick={handleFinalizar}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
