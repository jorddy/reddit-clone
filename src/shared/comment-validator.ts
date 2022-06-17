import { z } from "zod";

export const commentValidator = z.object({
  postId: z.string(),
  comment: z.string().min(1, "You must enter a comment")
});

export type CommentValidator = z.infer<typeof commentValidator>;
