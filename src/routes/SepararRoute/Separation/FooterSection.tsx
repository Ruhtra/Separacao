import { Button } from "@/components/ui/button";

interface FooterSectionProps {
  itemCount: number;
  canConfirmAll: boolean;
  onConfirmAll: () => void;
}

export function FooterSection({
  itemCount,
  canConfirmAll,
  onConfirmAll,
}: FooterSectionProps) {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Total Items: {itemCount}
          </p>
          <Button
            type="button"
            onClick={onConfirmAll}
            disabled={!canConfirmAll}
          >
            Confirm All
          </Button>
        </div>
      </div>
    </div>
  );
}
