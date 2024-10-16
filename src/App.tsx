import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { LayoutSeparate } from "./routes/SeparateRoute/LayoutSeparate";
import { LoadingApp } from "./components/Loading/LoadingApp";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) return <LoadingApp />;

  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};

function Render() {
  const { token, loading } = useAuth();

  if (loading) return <LoadingApp />;

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <LoginRoute />}
      />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<DashboardRoute />} />
        <Route path="separate" element={<LayoutSeparate />}>
          <Route index element={<SeparateRoute />} />
        </Route>
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <div className="layout h-full flex-1">
        <Render />
        <Toaster position="top-left" />
      </div>
    </AuthProvider>
  );
}
