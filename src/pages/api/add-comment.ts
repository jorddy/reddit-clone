import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { ZodError } from "zod";
import { getSession } from "next-auth/react";
import { commentValidator, CommentValidator } from "@/shared/comment-validator";

const addComment = (input: CommentValidator, userId: string) =>
  prisma.comment.create({
    data: {
      text: input.comment,
      post: { connect: { id: input.postId } },
      user: { connect: { id: userId } }
    }
  });

export type AddComment = Awaited<ReturnType<typeof addComment>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  try {
    if (session) {
      const input = commentValidator.parse(JSON.parse(req.body));
      const comment = await addComment(input, session.user.id);

      res.status(200).json(comment);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error);
    }
  }
};

export default handler;
