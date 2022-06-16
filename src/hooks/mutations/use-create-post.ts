import { QueryClient, useMutation } from "react-query";
import { ZodError } from "zod";
import { Post } from "@prisma/client";
import toast from "react-hot-toast";
import { PostValidator } from "@/shared/post-validator";

export const useCreatePost = (queryClient: QueryClient) =>
  useMutation<Post, ZodError, PostValidator>(
    async data => {
      const res = await fetch("/api/post/create", {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new ZodError(await res.json());
      return await res.json();
    },
    {
      onMutate: () => {
        toast.loading("Creating new post...");
      },
      onError: error => {
        toast.dismiss();
        toast.error(`Whoops something went wrong!`);
        console.error(error);
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success("New post created");
        queryClient.invalidateQueries(["posts"]);
      }
    }
  );
