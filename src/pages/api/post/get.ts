import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

const getPosts = () =>
  prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      subreddit: true,
      votes: true,
      user: true
    }
  });

export type GetPosts = Awaited<ReturnType<typeof getPosts>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getPosts();
  res.status(200).json(posts);
};

export default handler;
