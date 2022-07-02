import { useQuery } from "react-query";
import { GetPosts } from "@/pages/api/post/get";
import { ssrUrl } from "@/utils/ssr";

export const getPosts = () =>
  fetch(`${ssrUrl}/api/post/get`).then(r => r.json());

export const usePosts = () => useQuery<GetPosts>(["posts"], getPosts);
