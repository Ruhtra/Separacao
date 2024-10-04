import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { Toaster } from "./components/ui/sonner";
import { DashboardRoute } from "./routes/DashBoardRoute";
import { ConferirRoute } from "./routes/ConferirRoute";
import { SepararRoute } from "./routes/SepararRoute";
import { ShowRoute } from "./routes/ShowRoute";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<IndexRoute />} />
        <Route path="/" element={<DashboardRoute />} />
        <Route path="/">
          <Route path="conferir" element={<ConferirRoute />} />
          <Route path="separar" element={<SepararRoute />} />
          <Route path="show" element={<ShowRoute />} />
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
