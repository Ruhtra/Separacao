import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { orderNumberSchema } from "./validationSchema";

type FormValues = {
  orderNumber: string;
};

export type SearchOrderProps = {
  to: string;
};
export function SearchOrder({ to }: SearchOrderProps) {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(orderNumberSchema),
    defaultValues: {
      orderNumber: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    navigate(`${to}/${data.orderNumber}`);
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Pedido</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o número do pedido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Buscar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
