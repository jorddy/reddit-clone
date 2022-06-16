import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { postValidator, PostValidator } from "@/shared/post-validator";

const getSubredditById = (subredditId: string) =>
  prisma.subreddit.findFirst({
    where: { topic: { equals: subredditId } }
  });

const createPost = async (input: PostValidator, userId: string) => {
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  try {
    const input = postValidator.parse(JSON.parse(req.body));
    const post = await createPost(input, session!.user.id);

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error);
    }
  }
};

export default handler;
