import { useSeparationContext } from "./CheckContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { StatusIcon } from "./Utils";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  canConfirmAll: boolean;
  isPending: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  canConfirmAll,
  isPending,
}: ConfirmationDialogProps) {
  const { items, itemConfirmationStatus } = useSeparationContext();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm All Items</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.idseparacao_item}
                className="flex items-center space-x-2"
              >
                <StatusIcon
                  status={itemConfirmationStatus[item.idseparacao_item]}
                />

                <span className="flex-grow truncate">
                  {item.descricao_item}
                </span>
                <span>
                  {item.qtd_separada} / {item.qtd}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={
              !canConfirmAll ||
              isPending ||
              items.some(
                (item) =>
                  itemConfirmationStatus[item.idseparacao_item] !== "success" &&
                  itemConfirmationStatus[item.idseparacao_item] !== "idle"
              )
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
