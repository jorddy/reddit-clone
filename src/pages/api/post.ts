import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { postValidator } from "@/shared/post-validator";
import { getPosts } from "@/backend/data/get-posts";
import { createPost } from "@/backend/data/create-post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const posts = await getPosts();
    res.status(200).json(posts);
  }

  if (req.method === "POST") {
    try {
      const input = postValidator.parse(JSON.parse(req.body));
      const post = await createPost(input, session!.user.id);

      res.status(200).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json(error);
      }
    }
  }
};

export default handler;
