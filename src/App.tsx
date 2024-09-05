import { Route, Routes } from "react-router-dom";
import { IndexRoute } from "./routes/IndexRoute";
import { SepararRoute } from "./routes/SepararRoute";
import { Toaster } from "./components/ui/sonner";
import { SelectForm } from "./components/myUi/teste";

function Render() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/separar" element={<SepararRoute />} />
        <Route path="/teste" element={<SelectForm />} />
        {/* <Route path="/conferencia" element={<IndexRoute />} /> */}
      </Routes>
    </>
  );
}

export function App() {
  return (
    <div className="layout h-full flex-1">
      <Render />
      <Toaster />
    </div>
  );
}
