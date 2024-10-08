import { ConfirmationDialog } from "./SeparateDialog";
import { FooterSection } from "./FooterSection";
import { ItemList } from "./ItemList";
import { TopSection } from "./TopSection";
import { SeparationProvider, useSeparationContext } from "./SeparateContext";
import { useAuth } from "@/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCompleteSeparacao } from "@/services/Querys/Separacao/CompleteSeparacao";
import { useGetSeparacao } from "@/services/Querys/Separacao/GetSeparacao";
import { useGetListItem } from "@/services/Querys/Item/GetListItem";
import { useState } from "react";
import { LoadingState } from "./LoadingState";
import { NoItemsState } from "./NoItemsState";
import { ErrorState } from "./ErrorState";

function SeparationLayoutContent({
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
        idOperador: idOperador, // Assuming you have the operator ID available
      });
      setIsDialogOpen(false);
      navigate(0);
      //   navigate(`/show/${orderNumber}`);
    } catch (error) {
      console.error("Failed to complete order:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <TopSection clientName={clientName} orderNumber={orderNumber} />
        <ItemList numpedido={orderNumber} />
        <FooterSection
          itemCount={items.length}
          canConfirmAll={canConfirmAll}
          onConfirmAll={handleConfirmAll}
        />
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleCompleteOrder}
        canConfirmAll={canConfirmAll}
        isPending={completeSeparacao.isPending}
      />
    </>
  );
}
export type Pageprops = {
  numpedido: string;
};
export function Page({ numpedido }: Pageprops) {
  const separacaoQuery = useGetSeparacao({ numpedido: numpedido }, true);
  const itemListQuery = useGetListItem({ numpedido: numpedido }, true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const completeSeparacao = useCompleteSeparacao();

  if (separacaoQuery.isLoading || itemListQuery.isLoading)
    return <LoadingState />;
  if (separacaoQuery.isError || itemListQuery.isError) return <ErrorState />;
  if (!separacaoQuery.data) return <NoItemsState orderNumber={numpedido} />;
  if (!itemListQuery.data || itemListQuery.data.length === 0)
    return <NoItemsState orderNumber={numpedido} />;

  return (
    <SeparationProvider initialItems={itemListQuery.data}>
      <SeparationLayoutContent
        orderNumber={numpedido || ""}
        clientName={separacaoQuery.data.cliente || ""}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        completeSeparacao={completeSeparacao}
      />
    </SeparationProvider>
  );
}
