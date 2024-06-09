import z from "zod";

export const validProductFormSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name must be at least 1 character long"),
  productPrice: z.number().min(0.01, "Price must be at least $0.01"),
  productQuantity: z.number().min(0, "Quantity must be at least 0"),
});
