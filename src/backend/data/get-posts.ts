import { prisma } from "./client";

export const getPosts = () =>
  prisma.post.findMany({
    include: { comments: true, subreddit: true, votes: true }
  });

export type GetPosts = Awaited<ReturnType<typeof getPosts>>;
