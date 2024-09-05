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
import { useGetListOperador } from "@/services/Querys/Operador";

// Schema de validação
const FormSchema = z.object({
  id: z
    .string({
      required_error: "Por favor selecione um Operador.",
    })
    .min(1),
});

export function IndexRoute() {
  const navigate = useNavigate();

  // Inicializando o formulário
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Função de redirecionamento
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
          <CardContent className="p-5 bgw-full">
            <Form {...form}>
              <form className="w-full flex flex-col items-center justify-center m-auto gap-2">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="flex justify-center flex-col items-center">
                      <FormLabel>Operador</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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

                <div className="flex gap-4">
                  {/* Botão para redirecionar para /separar */}
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit("/separar"))}
                  >
                    Separar
                  </Button>

                  {/* Botão para redirecionar para /conferir */}
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit("/conferir"))}
                  >
                    Conferir
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
