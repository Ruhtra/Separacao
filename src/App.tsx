import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "./routes/LogInRoute";
import { Toaster } from "./components/ui/sonner";
import { DashboardRoute } from "./routes/DashBoardRoute";
import { ConferirRoute } from "./routes/ConferirRoute";
import { ShowRoute } from "./routes/ShowRoute";
import Teste from "./routes/Teste";
import { SearchOrder } from "./routes/SepararRoute/SarchOrder";
import SeparationLayout from "./routes/SepararRoute/Separation";
import { SeparateLayout } from "./routes/SepararRoute/Separation/SeparateLayout";
import { ShowLayout } from "./routes/ShowRoute/ShowLayout";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/">
          <Route path="" element={<DashboardRoute />} />
          <Route path="conferir" element={<ConferirRoute />} />
          <Route path="separate" element={<SeparateLayout />}>
            <Route index element={<SearchOrder to="/separate" />} />
            <Route path=":orderNumber" element={<SeparationLayout />} />
          </Route>
          <Route path="show" element={<ShowLayout />}>
            <Route index element={<SearchOrder to="/show" />} />
            <Route path=":orderNumber" element={<ShowRoute />} />
          </Route>
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
