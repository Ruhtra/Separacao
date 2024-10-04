interface TopSectionProps {
  clientName: string;
  orderNumber: string;
}

export function TopSection({ clientName, orderNumber }: TopSectionProps) {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-lg font-semibold truncate max-w-[200px] sm:max-w-none">
              Client: {clientName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Order: {orderNumber}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
