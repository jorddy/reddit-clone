import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { ZodError } from "zod";
import { getSession } from "next-auth/react";
import { voteValidator, VoteValidator } from "@/shared/vote-validator";

const addVote = (input: VoteValidator, userId: string) =>
  prisma.vote.upsert({
    where: { id: input.voteId || "" },
    create: {
      upvote: input.upvote,
      post: { connect: { id: input.postId } },
      user: { connect: { id: userId } }
    },
    update: {
      upvote: input.upvote
    }
  });

export type AddVote = Awaited<ReturnType<typeof addVote>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  try {
    if (session) {
      const input = voteValidator.parse(JSON.parse(req.body));
      const vote = await addVote(input, session.user.id);
      console.log(vote);

      res.status(200).json(vote);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error);
    }
  }
};

export default handler;
