import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConfirmItem } from "@/services/Querys/Items";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleCheckBigIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  qtd: z.number().min(0),
});

export type InputsProps = {
  idseparacao_item: number;
};

export function Inputs({ idseparacao_item }: InputsProps) {
  const { mutate, status, failureCount } = useConfirmItem();
  const [nextTime, setNextTime] = useState(0);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Função para iniciar o timer
    const startTimer = () => {
      setNextTime(10); // Resetar o tempo para 10 segundos
      timer = setInterval(() => {
        setNextTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    startTimer();

    // Limpar o intervalo quando o componente for desmontado ou o failureCount mudar
    return () => clearInterval(timer);
  }, [failureCount]);

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
                    value={field.value === null ? 0 : field.value} // Se for null, exibe 0
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
                    className={`w-14 ${
                      form.formState.errors.qtd ? "border-red-500" : ""
                    }`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {status === "pending" && failureCount >= 1 && nextTime}
          {status === "pending" && failureCount == 0 && (
            <LoaderCircleIcon />
          )}{" "}
          {status === "error" || (failureCount >= 1 && <TriangleAlertIcon />)}
          {status === "success" ||
            (status === "idle" && <CircleCheckBigIcon />)}
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
