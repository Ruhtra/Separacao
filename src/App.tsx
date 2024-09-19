import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { SepararRoute } from "./routes/SepararRoute/SepararRoute";
import { Toaster } from "./components/ui/sonner";
import { InternetProvider } from "./Contexts/InternetContext";
import { ConferirRoute } from "./routes/ConfererirRoute/ConferirRoute";
import { BuscarConferenciaRoute } from "./routes/BuscarConferencia/BuscarConferenciaRoute";
import { ConferenciaRoute } from "./routes/Conferencia/ConferenciaRoute";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/separar" element={<SepararRoute />} />
        <Route path="/conferir" element={<ConferirRoute />} />
        <Route
          path="/BuscarConferencia"
          element={<BuscarConferenciaRoute />}
        ></Route>
        <Route
          path="/BuscarConferencia/Conferencia"
          element={<ConferenciaRoute />}
        />
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
