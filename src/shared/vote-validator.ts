import { z } from "zod";

export const voteValidator = z.object({
  postId: z.string(),
  voteId: z.string().optional(),
  upvote: z.boolean()
});

export type VoteValidator = z.infer<typeof voteValidator>;
