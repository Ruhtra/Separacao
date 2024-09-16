import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useContext } from "react";
import { TableContext } from "./Context/TableContext";

export function SearchTable() {
  const { toogleFilter, inputText, setToogleFilter, setInputText } =
    useContext(TableContext);

  return (
    <div className="flex items-center justify-between gap-2">
      <Input
        placeholder="Buscar pelo Código"
        className="max-w-[12em]"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <label
        htmlFor="onlyNull"
        className="flex gap-2 items-center justify-center cursor-pointer"
      >
        <Switch
          id="onlyNull"
          checked={toogleFilter}
          onCheckedChange={() => {
            setToogleFilter(!toogleFilter);
          }}
        />
        Apenas em separação
      </label>
    </div>
  );
}
