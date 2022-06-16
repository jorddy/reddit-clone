import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import {
  PostByIdValidator,
  postByIdValidator
} from "@/shared/post-by-id-validator";

const getPostsById = (input: PostByIdValidator) =>
  prisma.post.findFirst({
    where: { id: input.id },
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      subreddit: true,
      votes: true,
      user: true
    }
  });

export type GetPostsById = Awaited<ReturnType<typeof getPostsById>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const input = postByIdValidator.parse({ id });
    const posts = await getPostsById(input);

    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error);
    }
  }
};

export default handler;
