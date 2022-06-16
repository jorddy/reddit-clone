import { z } from "zod";

export const postByTopicValidator = z.object({
  topic: z.string().min(1, "You must have a topic")
});

export type PostByTopicValidator = z.infer<typeof postByTopicValidator>;
