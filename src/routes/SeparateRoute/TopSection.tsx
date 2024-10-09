interface TopSectionProps {
  clientName: string;
  orderNumber: string;
}

export function TopSection({ clientName, orderNumber }: TopSectionProps) {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="w-full">
            <h2 className="text-lg font-semibold truncate sm:max-w-none">
              Client: {clientName}
            </h2>
            <div className="flex justify-between items-center sm:block">
              <p className="text-sm text-muted-foreground">
                Order: {orderNumber}
              </p>
              <p className="text-sm text-muted-foreground sm:hidden">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0 hidden sm:block">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
