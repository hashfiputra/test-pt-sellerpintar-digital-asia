import { z } from "zod";

export type AddSchema = z.infer<typeof addSchema>;
export type EditSchema = z.infer<typeof editSchema>;

export const addSchema = z.object({
  name: z.string().nonempty("Category field cannot be empty"),
});

export const editSchema = z.object({
  name: z.string().nonempty("Category field cannot be empty"),
});
