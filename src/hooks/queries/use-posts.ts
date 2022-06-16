import { useQuery } from "react-query";
import { GetPosts } from "@/pages/api/post/get";

export const usePosts = () =>
  useQuery<GetPosts>(["posts"], () =>
    fetch("/api/post/get").then(r => r.json())
  );
