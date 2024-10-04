import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/NavBar";

export function SeparateRoute() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar title="Separação" />
      <div className="flex-grow overflow-hidden">
        <Routes></Routes>
      </div>
    </div>
  );
}
