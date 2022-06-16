import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import {
  PostByTopicValidator,
  postByTopicValidator
} from "@/shared/post-by-topic-validator";

const getPostsByTopic = (input: PostByTopicValidator) =>
  prisma.post.findMany({
    where: { subreddit: { topic: input.topic } },
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      subreddit: true,
      votes: true,
      user: true
    }
  });

export type GetPostsByTopic = Awaited<ReturnType<typeof getPostsByTopic>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const topic = req.query.topic;
    const input = postByTopicValidator.parse({ topic });
    const posts = await getPostsByTopic(input);

    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error);
    }
  }
};

export default handler;
