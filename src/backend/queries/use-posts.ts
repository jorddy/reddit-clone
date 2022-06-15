import { useQuery } from "react-query";
import { GetPosts } from "../data/get-posts";

export const usePosts = () =>
  useQuery<GetPosts>(["posts"], () => fetch("/api/post").then(r => r.json()));
