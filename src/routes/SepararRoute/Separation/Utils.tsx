import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

type ItemStatus = "idle" | "pending" | "success" | "error";

export type StatusIconProps = {
  status: ItemStatus;
};

export function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case "pending":
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
}
