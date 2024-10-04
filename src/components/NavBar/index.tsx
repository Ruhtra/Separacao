import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    if (pathSegments.length > 1) {
      const parentPath = "/" + pathSegments.slice(0, -1).join("/");
      navigate(parentPath);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="flex items-center h-14 justify-between px-4 py-3 bg-white shadow-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
        className="mr-2"
        aria-label="Go back"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <h1 className="text-lg font-semibold text-center flex-grow">{title}</h1>
      <div className="w-10" /> {/* Spacer to balance the layout */}
    </nav>
  );
}
