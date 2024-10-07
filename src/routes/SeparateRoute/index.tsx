import { Navbar } from "@/components/NavBar";
import { NextQueueDisplay } from "./NextQueueDisplay";
export function SeparateRoute() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar title="Separar" />
      <div className="flex-grow flex items-center justify-center">
        <NextQueueDisplay />
      </div>
      {/* <Toaster position="top-right" /> */}
    </div>
  );
}
