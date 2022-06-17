import { useQuery } from "react-query";
import { ZodError } from "zod";
import { SubredditByLimitValidator } from "@/shared/subreddits-by-limit-validator";
import { GetSubredditsByLimit } from "@/pages/api/get-subreddits-by-limit";

export const useSubredditsByLimit = (input: SubredditByLimitValidator) =>
  useQuery<GetSubredditsByLimit, ZodError>(
    ["subreddits-by-limit"],
    async () => {
      const res = await fetch(
        `/api/get-subreddits-by-limit?limit=${input.limit}`
      );

      if (!res.ok) throw new ZodError(await res.json());
      return await res.json();
    }
  );
