import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Call, TableContext } from "./TableContext";
import { useContext } from "react";

export type InputsProps = {
  idseparacao_item: number;
  qtdPedido: number;
  call: Call;
};

export function TableForm({ idseparacao_item, qtdPedido, call }: InputsProps) {
  const { idOperador } = useContext(TableContext);

  const FormSchema = z.object({
    qtd: z
      .number()
      .min(0, "Quantidade deve ser maior ou igual a 0")
      .max(
        qtdPedido,
        `A quantidade está superior ao do pedido, verifique novamente`
      ),
  });

  const { mutate, status } = call;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      qtd: 0,
    },
  });

  function onSubmitConfirmItem(data: z.infer<typeof FormSchema>) {
    mutate({
      idseparacao_item: idseparacao_item,
      qtd: data.qtd,
      idoperador: idOperador,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitConfirmItem)}
        className="flex w-full max-w-48 ml-auto items-start relative"
      >
        <FormField
          control={form.control}
          name="qtd"
          render={({ field }) => (
            <FormItem className="">
              <div className="">
                <FormControl>
                  <Input
                    disabled={status === "pending"}
                    {...field}
                    value={field.value === null ? 0 : field.value}
                    onChange={(e) => {
                      let inputValue = e.target.value;
                      if (field.value === 0 || field.value == null) {
                        inputValue = inputValue.replace("0", "");
                        field.onChange(
                          e.target.value === "" ? 0 : Number(inputValue)
                        );
                        e.target.value = inputValue;
                      } else {
                        field.onChange(
                          e.target.value === "" ? 0 : Number(inputValue)
                        );
                      }
                    }}
                    type="number"
                    className={`w-[5em] ${
                      form.formState.errors.qtd ? "border-red-500" : ""
                    }`}
                    aria-invalid={!!form.formState.errors.qtd}
                    aria-describedby="qtd-error"
                  />
                </FormControl>
                {form.formState.errors.qtd && (
                  <div
                    id="qtd-error"
                    role="alert"
                    className="absolute right-6 bottom-full mb-1 w-max p-2 text-sm bg-red-100 border border-red-500 text-red-800 rounded shadow-lg"
                  >
                    <div className="relative">
                      {form.formState.errors.qtd.message}
                      <div className="absolute left-3 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-100"></div>
                    </div>
                  </div>
                )}
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={status === "pending"}
          className="pl-0 pr-0 w-full ml-2"
        >
          Separar
        </Button>
      </form>
    </Form>
  );
}
