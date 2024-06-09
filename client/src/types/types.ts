import z from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type Product = z.infer<typeof productSchema>;
