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

import { ReactNode, useContext } from "react";
import { TableContext } from "../TablePersonalized/TableContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetIconStatus, GetStatus } from "../TablePersonalized/Utils";
export type DialogConfirmProps = {
  children?: ReactNode;
};

export function DialogConfirm({ children }: DialogConfirmProps) {
  const { itens, calls } = useContext(TableContext);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent
          className="flex flex-col max-w-[90%] "
          showCloseIcon={true}
        >
          <DialogHeader>
            <DialogTitle>Confirmar separação</DialogTitle>

            <DialogDescription>
              Confirme os itens da separação
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="bg-primary-foreground ">
            <div className="flex flex-col max-h-[70svh] ">
              {itens.map((e, i) => (
                <div
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
          <DialogFooter className="justify-end">{children}</DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
