import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useGetListOperador } from "@/services/Querys/Operador/GetListOperador";

const FormSchema = z.object({
  id: z
    .string({
      required_error: "Por favor selecione um Operador.",
    })
    .min(1),
});

export function IndexRoute() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(path: string) {
    return (data: z.infer<typeof FormSchema>) => {
      navigate(`${path}?idoperador=${data.id}`);
    };
  }

  const { data, isLoading, isError } = useGetListOperador();

  if (isLoading) return <h1>loading</h1>;
  if (isError) return <h1>erro</h1>;

  return (
    <>
      <div className="h-full bg-gray-500 flex items-center justify-center">
        <Card className="bg-yellow-200 min-w-[20em] flex items-center justify-center">
          <CardContent className="p-5">
            <Form {...form}>
              <form className="w-full flex items-center justify-center m-auto gap-2">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="flex justify-center flex-col items-center w-fit">
                      <FormLabel>Operador</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-red-500 w-44 bg-primary text-white">
                            <SelectValue placeholder="Selecione Operador" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.map((o) => {
                            return (
                              <SelectItem
                                key={o.idOperador}
                                value={o.idOperador.toString()}
                              >
                                {o.nome}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4">
                  {/* Botão para redirecionar para /separar */}
                  <Button
                    type="button"
                    className="min-w-28 flex justify-between items-center"
                    onClick={form.handleSubmit(onSubmit("/separar"))}
                  >
                    Separar
                    <ArrowRightIcon className="w-5" />
                  </Button>

                  {/* Botão para redirecionar para /conferir */}
                  <Button
                    type="button"
                    className="min-w-28 flex justify-between items-center"
                    onClick={form.handleSubmit(onSubmit("/conferir"))}
                  >
                    Conferir
                    <ArrowRightIcon className="w-5" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
