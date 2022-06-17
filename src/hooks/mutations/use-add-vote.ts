import { QueryClient, useMutation } from "react-query";
import { ZodError } from "zod";
import { AddVote } from "@/pages/api/add-vote";
import { VoteValidator } from "@/shared/vote-validator";
import toast from "react-hot-toast";

export const useAddVote = (queryClient: QueryClient) =>
  useMutation<AddVote, ZodError, VoteValidator>(
    async data => {
      const res = await fetch("/api/add-vote", {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new ZodError(await res.json());
      return await res.json();
    },
    {
      onMutate: () => {
        toast.loading("Voting...");
      },
      onError: error => {
        toast.dismiss();
        toast.error(`Whoops something went wrong!`);
        console.error(error);
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success("Thanks for your vote!");
        queryClient.invalidateQueries(["posts-by-id"]);
      }
    }
  );
