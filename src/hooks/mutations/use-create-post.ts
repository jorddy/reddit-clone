import { QueryClient, useMutation } from "react-query";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { CreatePost } from "@/pages/api/post/create";
import { PostValidator } from "@/shared/post-validator";

export const useCreatePost = (queryClient: QueryClient) =>
  useMutation<CreatePost, ZodError, PostValidator>(
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
