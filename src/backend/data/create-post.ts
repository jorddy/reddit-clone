import { prisma } from "./client";
import { getSubredditById } from "./get-subreddit-by-id";
import { PostValidator } from "@/shared/post-validator";

export const createPost = async (input: PostValidator, userId: string) => {
  const subreddit = await getSubredditById(input.subreddit);

  return await prisma.post.create({
    data: {
      ...input,
      subreddit: {
        connectOrCreate: {
          create: { topic: input.subreddit },
          where: { id: subreddit?.id || "" }
        }
      },
      user: { connect: { id: userId } }
    }
  });
};
