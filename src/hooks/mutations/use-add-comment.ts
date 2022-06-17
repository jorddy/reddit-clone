import { QueryClient, useMutation } from "react-query";
import { ZodError } from "zod";
import { AddComment } from "@/pages/api/add-comment";
import { CommentValidator } from "@/shared/comment-validator";
import toast from "react-hot-toast";

export const useAddComment = (queryClient: QueryClient) =>
  useMutation<AddComment, ZodError, CommentValidator>(
    async data => {
      const res = await fetch("/api/add-comment", {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new ZodError(await res.json());
      return await res.json();
    },
    {
      onMutate: () => {
        toast.loading("Posting your comment...");
      },
      onError: error => {
        toast.dismiss();
        toast.error(`Whoops something went wrong!`);
        console.error(error);
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success("Your comment has been added");
        queryClient.invalidateQueries(["posts-by-id"]);
      }
    }
  );
