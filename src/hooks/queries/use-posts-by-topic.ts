import { useQuery } from "react-query";
import { ZodError } from "zod";
import { GetPostsByTopic } from "@/pages/api/post/get-by-topic";
import { PostByTopicValidator } from "@/shared/post-by-topic-validator";

export const usePostsByTopic = (input: PostByTopicValidator) =>
  useQuery<GetPostsByTopic, ZodError>(["posts-by-topic"], async () => {
    const res = await fetch(`/api/post/get-by-topic?topic=${input.topic}`);

    if (!res.ok) throw new ZodError(await res.json());
    return await res.json();
  });
