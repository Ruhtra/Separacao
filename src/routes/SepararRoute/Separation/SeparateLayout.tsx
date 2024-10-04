import { Navbar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export function SeparateLayout() {
  return (
    <div className="flex flex-col h-full">
      <Navbar title="Separar" />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
