import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { ZodError } from "zod";
import { PostValidator } from "@/shared/post-validator";
import { Post } from "@prisma/client";

export const useCreatePost = () =>
  useMutation<Post, ZodError, PostValidator>(
    async data => {
      const res = await fetch("/api/post", {
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
      onSuccess: data => {
        toast.dismiss();
        toast.success("New post created");
        console.log(data);
      }
    }
  );
