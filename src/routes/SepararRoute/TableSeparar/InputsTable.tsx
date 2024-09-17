import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Call } from "./Context/TableContext";

const FormSchema = z.object({
  qtd: z.number().min(0),
});

export type InputsProps = {
  idseparacao_item: number;
  call: Call;
};

export function InputsTable({ idseparacao_item, call }: InputsProps) {
  const { mutate, status } = call;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      qtd: 0,
    },
  });

  function onSubmitConfirmItem() {
    return (data: z.infer<typeof FormSchema>) => {
      mutate({
        idseparacao_item: idseparacao_item,
        qtd: data.qtd,
      });
    };
  }

  return (
    <>
      <Form {...form}>
        <form className="flex w-full max-w-48 ml-auto">
          <FormField
            control={form.control}
            name="qtd"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={status == "pending"}
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onClick={form.handleSubmit(onSubmitConfirmItem())}
            disabled={status == "pending"}
            className="pl-0 pr-0 w-full"
          >
            Separar
          </Button>
        </form>
      </Form>
    </>
  );
}
