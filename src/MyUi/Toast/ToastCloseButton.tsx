import { InfoIcon } from "lucide-react";
import { toast } from "sonner";

export type ToastCloseButtonProps = {
  description: string;
};
export function ToastCloseButton({ description }: ToastCloseButtonProps) {
  return toast(description, {
    icon: <InfoIcon />,
    action: {
      label: "X",
      onClick: () => {},
    },
  });
}
