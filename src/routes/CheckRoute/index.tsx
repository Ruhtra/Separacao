import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListItem } from "@/services/Querys/Item/GetListItem";
import { useCompleteSeparacao } from "@/services/Querys/Separacao/CompleteSeparacao";
import { SeparationProvider, useSeparationContext } from "./CheckContext";
import { TopSection } from "./TopSection";
import { ItemList } from "./ItemList";
import { FooterSection } from "./FooterSection";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { NoItemsState } from "./NoItemsState";
import { useAuth } from "@/Contexts/AuthContext";
import { useGetConferencia } from "@/services/Querys/Conferir/GetConferencia";

export function CheckRoute() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const conferenciaQuery = useGetConferencia({ numpedido: orderNumber }, true);
  const itemListQuery = useGetListItem(
    { numpedido: orderNumber },
    !!orderNumber
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const completeSeparacao = useCompleteSeparacao();

  if (conferenciaQuery.isLoading || itemListQuery.isLoading)
    return <LoadingState />;
  if (conferenciaQuery.isError || itemListQuery.isError) return <ErrorState />;
  if (!conferenciaQuery.data) return <NoItemsState orderNumber={orderNumber} />;
  if (!itemListQuery.data || itemListQuery.data.length === 0)
    return <NoItemsState orderNumber={orderNumber} />;

  return (
    <SeparationProvider initialItems={itemListQuery.data}>
      <SeparationLayoutContent
        orderNumber={orderNumber || ""}
        clientName={conferenciaQuery.data.cliente || ""}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        completeSeparacao={completeSeparacao}
      />
    </SeparationProvider>
  );
}

export function SeparationLayoutContent({
  orderNumber,
  clientName,
  isDialogOpen,
  setIsDialogOpen,
  completeSeparacao,
}: {
  orderNumber: string;
  clientName: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  completeSeparacao: ReturnType<typeof useCompleteSeparacao>;
}) {
  const { items, canConfirmAll } = useSeparationContext();
  const { idOperador } = useAuth();
  const navigate = useNavigate();

  const handleConfirmAll = () => {
    setIsDialogOpen(true);
  };

  const handleCompleteOrder = async () => {
    try {
      await completeSeparacao.mutateAsync({
        numpedido: orderNumber,
        idOperador: idOperador,
      });
      setIsDialogOpen(false);
      navigate(`/show/${orderNumber}`);
    } catch (error) {
      console.error("Failed to complete order:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <TopSection clientName={clientName} orderNumber={orderNumber} />
      <div className="flex-1 overflow-hidden">
        <ItemList numpedido={orderNumber} />
      </div>
      <FooterSection
        itemCount={items.length}
        canConfirmAll={canConfirmAll}
        onConfirmAll={handleConfirmAll}
      />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleCompleteOrder}
        canConfirmAll={canConfirmAll}
        isPending={completeSeparacao.isPending}
      />
    </div>
  );
}
