import { useQuery } from "react-query";
import { GetPosts } from "@/pages/api/post/get";

export const getPosts = () =>
  fetch("http://localhost:3000/api/post/get").then(r => r.json());

export const usePosts = () => useQuery<GetPosts>(["posts"], getPosts);
