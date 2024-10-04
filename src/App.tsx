import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "./routes/LogInRoute";
import { Toaster } from "./components/ui/sonner";
import { DashboardRoute } from "./routes/DashBoardRoute";
import { ShowRoute } from "./routes/ShowRoute";
import { SearchOrderRoute } from "./routes/SarchOrderRoute";
import { CheckRoute } from "./routes/CheckRoute";
import { LayoutCheck } from "./routes/CheckRoute/LayoutCheck";
import { ShowLayout } from "./routes/ShowRoute/LayoutShow";
import { SeparateRoute } from "./routes/SeparateRoute";
import { LogoutRoute } from "./routes/LogoutRoute/Index";
function Render() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/">
          <Route path="" element={<DashboardRoute />} />
          <Route path="separate" element={<SeparateRoute />} />
          <Route path="check" element={<LayoutCheck />}>
            <Route index element={<SearchOrderRoute />} />
            <Route path=":orderNumber" element={<CheckRoute />} />
          </Route>
          <Route path="show" element={<ShowLayout />}>
            <Route index element={<SearchOrderRoute />} />
            <Route path=":orderNumber" element={<ShowRoute />} />
          </Route>
          <Route path="logout" element={<LogoutRoute />} />
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
