import { useQuery } from "react-query";
import { GetPosts } from "@/pages/api/post/get";

export const getPosts = () =>
  fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/get`).then(r => r.json());

export const usePosts = () => useQuery<GetPosts>(["posts"], getPosts);
