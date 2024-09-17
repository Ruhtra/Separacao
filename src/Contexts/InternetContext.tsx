import { ToastCloseButton } from "@/MyUi/Toast/ToastCloseButton";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
interface InternetContextType {
  isOnline: boolean;
}
type InternetProps = {
  children: ReactNode;
};

export const InternetContext = createContext<InternetContextType>(
  {} as InternetContextType
);

export function InternetProvider({ children }: InternetProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (isOnline == false)
      ToastCloseButton({ description: "Você foi desconectado da internet!" });
  }, [isOnline]);

  return (
    <InternetContext.Provider value={{ isOnline }}>
      {children}
    </InternetContext.Provider>
  );
}
