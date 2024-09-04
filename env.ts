import z from "zod";

const envScheme = z.object({
  VITE_API: z.string(),
});

export const env = envScheme.parse(import.meta.env);
