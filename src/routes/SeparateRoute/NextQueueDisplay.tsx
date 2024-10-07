import { useState, useEffect } from "react";
import { useAuth } from "@/Contexts/AuthContext";
import { useGetNextQueue } from "@/services/Querys/Separacao/GetNextQueue";

export function NextQueueDisplay() {
  const { idOperador } = useAuth();
  const [countdown, setCountdown] = useState(15);
  const [validNumber, setValidNumber] = useState<string | null>(null);

  const { data, refetch, isLoading } = useGetNextQueue({
    idOperador,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          refetch();
          return 15;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refetch]);

  useEffect(() => {
    if (data?.numpedido && data.numpedido !== -1) {
      setValidNumber(data.numpedido.toString());
    }
  }, [data]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {validNumber ? (
        <div className="text-2xl font-bold text-green-600">
          Next Queue Number: {validNumber}
        </div>
      ) : (
        <>
          <div className="text-xl mb-2">Fetching next queue number...</div>
          <div className="text-gray-600">
            Next attempt in: {countdown} seconds
          </div>
          {isLoading && <div className="mt-2 text-blue-500">Loading...</div>}
        </>
      )}
    </div>
  );
}
