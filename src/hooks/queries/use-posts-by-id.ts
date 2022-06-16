import { useQuery } from "react-query";
import { ZodError } from "zod";
import { GetPostsById } from "@/pages/api/post/get-by-id";
import { PostByIdValidator } from "@/shared/post-by-id-validator";

export const usePostsById = (input: PostByIdValidator) =>
  useQuery<GetPostsById, ZodError>(
    ["posts-by-id", input.id],
    async () => {
      const res = await fetch(`/api/post/get-by-id?id=${input.id}`);

      if (!res.ok) throw new ZodError(await res.json());
      return await res.json();
    },
    {
      enabled: !!input.id
    }
  );
