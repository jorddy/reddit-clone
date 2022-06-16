import { z } from "zod";

export const postByIdValidator = z.object({
  id: z.string().min(1, "You must have a id")
});

export type PostByIdValidator = z.infer<typeof postByIdValidator>;
