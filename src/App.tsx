import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { SepararRoute } from "./routes/SepararRoute/SepararRoute";
import { Toaster } from "./components/ui/sonner";
import { InternetProvider } from "./Contexts/InternetContext";
import { ConferirRoute } from "./routes/ConfererirRoute/ConferirRoute";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/separar" element={<SepararRoute />} />
        <Route path="/conferir" element={<ConferirRoute />} />
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
