import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { ArrowLeftCircle } from "lucide-react";

export type NavbarProps = {
  title: string;
  operador: string;
};
export function NavBar({ title, operador }: NavbarProps) {
  return (
    <Card className="">
      <CardContent className="w-full h-full relative grid grid-cols-[1fr_1fr_1fr] justify-center items-center p-2">
        <Link
          to={".."}
          className="absolute top-[50%] left-2 translate-y-[-50%]"
        >
          <ArrowLeftCircle />
        </Link>

        <div></div>
        <h2 className="text-center">{title}</h2>

        <p className="justify-self-end">Operador: {operador}</p>
      </CardContent>
    </Card>
  );
}
