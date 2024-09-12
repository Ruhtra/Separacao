import {
  CircleCheckBigIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
} from "lucide-react";

export type GetIconStatusProps = {
  status: string;
  failureCount: number;
};
export function GetStatus({
  status,
  failureCount,
}: GetIconStatusProps): "error" | "success" | "loading" | undefined {
  if (status === "pending" && failureCount == 0) return "loading";
  if (status === "error" || failureCount >= 1) return "error";
  if (status === "success" || status === "idle") return "success";
}
export function GetIconStatus({ status, failureCount }: GetIconStatusProps) {
  return (
    <div className="flex items-center">
      {GetStatus({ status, failureCount }) == "loading" && (
        <LoaderCircleIcon width={"auto"} className="w-full animate-spin" />
      )}
      {GetStatus({ status, failureCount }) == "error" && (
        <TriangleAlertIcon className="text-red-500" />
      )}
      {GetStatus({ status, failureCount }) == "success" && (
        <CircleCheckBigIcon className="text-green-500" />
      )}
    </div>
  );
}
