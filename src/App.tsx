import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { SepararRoute } from "./routes/SepararRoute/SepararRoute";
import { Toaster } from "./components/ui/sonner";
import { InternetProvider } from "./Contexts/InternetContext";
import { BuscarConferenciaRoute } from "./routes/BuscarConferencia/BuscarConferenciaRoute";
import { ConferenciaRoute } from "./routes/Conferencia/ConferenciaRoute";
import { StatusRoute } from "./routes/StatusRoute";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/separar" element={<SepararRoute />} />
        <Route path="/find">
          <Route path="" element={<BuscarConferenciaRoute />}></Route>
          <Route path="Conferencia" element={<ConferenciaRoute />} />
        </Route>
        <Route path="/status" element={<StatusRoute />} />
      </Routes>
    </>
  );
}

export function App() {
  return (
    <InternetProvider>
      <div className="layout h-full flex-1">
        <Render />
        <Toaster position="top-left" />
      </div>
    </InternetProvider>
  );
}
