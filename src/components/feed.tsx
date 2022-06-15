import { FC } from "react";
import { usePosts } from "@/backend/queries/use-posts";
import Post from "./post";

const Feed: FC = () => {
  const { data, error } = usePosts();
  return (
    <div>
      {data?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
