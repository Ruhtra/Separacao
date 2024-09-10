import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { SepararRoute } from "./routes/SepararRoute/SepararRoute";
import { Toaster } from "./components/ui/sonner";
import { SelectForm } from "./components/myUi/teste";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Render() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/separar" element={<SepararRoute />} />
        <Route path="/teste" element={<SelectForm />} />
        {/* <Route path="/conferencia" element={<IndexRoute />} /> */}
      </Routes>
    </>
  );
}

export function App() {
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
    if (isOnline == false) toast.info("Você foi desconectado da internet!");
  }, [isOnline]);

  return (
    <div className="layout h-full flex-1">
      <Render />
      <Toaster />
    </div>
  );
}
