import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import {
  SubredditByLimitValidator,
  subredditByLimitValidator
} from "@/shared/subreddits-by-limit-validator";

const getSubredditsByLimit = (input: SubredditByLimitValidator) =>
  prisma.subreddit.findMany({
    take: input.limit,
    orderBy: { createdAt: "desc" }
  });

export type GetSubredditsByLimit = Awaited<
  ReturnType<typeof getSubredditsByLimit>
>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const limit = req.query.limit;
    const input = subredditByLimitValidator.parse({ limit: Number(limit) });
    const subreddits = await getSubredditsByLimit(input);

    res.status(200).json(subreddits);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error);
    }
  }
};

export default handler;
