import { useQuery } from "react-query";
import { ZodError } from "zod";
import { SubredditByLimitValidator } from "@/shared/subreddits-by-limit-validator";
import { GetSubredditsByLimit } from "@/pages/api/get-subreddits-by-limit";

export const getSubredditsByLimit = async (
  input: SubredditByLimitValidator
) => {
  const res = await fetch(
    `http://localhost:3000/api/get-subreddits-by-limit?limit=${input.limit}`
  );

  if (!res.ok) throw new ZodError(await res.json());
  return await res.json();
};

export const useSubredditsByLimit = (input: SubredditByLimitValidator) =>
  useQuery<GetSubredditsByLimit, ZodError>(["subreddits-by-limit"], () =>
    getSubredditsByLimit(input)
  );
