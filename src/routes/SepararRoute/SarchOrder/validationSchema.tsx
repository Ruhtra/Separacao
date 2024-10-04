import * as z from "zod";

export const orderNumberSchema = z.object({
  orderNumber: z
    .string()
    .min(1, "O número do pedido é obrigatório")
    .regex(/^\d+$/, "O número do pedido deve conter apenas dígitos"),
});
