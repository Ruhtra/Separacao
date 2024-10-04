import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { Toaster } from "./components/ui/sonner";
import { DashboardRoute } from "./routes/DashBoardRoute";
import { ConferirRoute } from "./routes/ConferirRoute";
import { ShowRoute } from "./routes/ShowRoute";
import Teste from "./routes/Teste";
import SearchOrder from "./routes/SepararRoute/SarchOrder";
import SeparationLayout from "./routes/SepararRoute/Separation";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<IndexRoute />} />
        <Route path="/">
          <Route path="" element={<DashboardRoute />} />
          <Route path="conferir" element={<ConferirRoute />} />
          <Route path="separate">
            <Route path="" element={<SearchOrder />} />
            <Route path=":orderNumber" element={<SeparationLayout />} />
          </Route>
          <Route path="show" element={<ShowRoute />} />
          <Route path="teste" element={<Teste />} />
        </Route>
      </Routes>
    </>
  );
}

export function App() {
  return (
    <div className="layout h-full flex-1">
      <Render />
      <Toaster position="top-left" />
    </div>
  );
}
