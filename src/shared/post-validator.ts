import { z } from "zod";

export const postValidator = z.object({
  title: z.string().max(192, "Your title is too long"),
  body: z.string().optional(),
  image: z.string().optional(),
  subreddit: z.string().min(1, "You must enter a Subreddit")
});

export type PostValidator = z.infer<typeof postValidator>;
