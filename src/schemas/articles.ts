import { z } from "zod";

export type AddSchema = z.infer<typeof addSchema>;
export type EditSchema = z.infer<typeof editSchema>;

export const addSchema = z.object({
  title: z.string().nonempty("Please enter title"),
  content: z.string().nonempty("Content field cannot be empty"),
  categoryId: z.string().nonempty("Please select a category"),
  imageUrl: z.string().nonempty("Please enter picture"),
});

export const editSchema = z.object({
  title: z.string().nonempty("Please enter title"),
  content: z.string().nonempty("Content field cannot be empty"),
  categoryId: z.string().nonempty("Please select a category"),
  imageUrl: z.string().nonempty("Please enter picture"),
});
