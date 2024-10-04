import { Navbar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export function ShowLayout() {
  return (
    <div className="flex flex-col h-full">
      <Navbar title="Visualização" />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
