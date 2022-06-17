import { z } from "zod";

export const subredditByLimitValidator = z.object({
  limit: z.number().min(1, "You must provide a limit")
});

export type SubredditByLimitValidator = z.infer<
  typeof subredditByLimitValidator
>;
