import { prisma } from "./client";

export const getSubredditById = (subredditId: string) =>
  prisma.subreddit.findFirst({
    where: { topic: { equals: subredditId } }
  });
