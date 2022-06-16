import { FC } from "react";
import { usePosts } from "@/hooks/queries/use-posts";
import { useRefetchToast } from "@/hooks/use-refetch-toast";
import { usePostsByTopic } from "@/hooks/queries/use-posts-by-topic";
import Post from "./post";

const SubredditFeed: FC<{ topic: string }> = ({ topic }) => {
  const { data, isLoading, isRefetching } = usePostsByTopic({ topic });
  useRefetchToast(isRefetching);

  return (
    <div className='my-5 space-y-4'>
      {isLoading && <p>Loading subreddit posts...</p>}
      {!isLoading &&
        data &&
        data.length > 0 &&
        data?.map(post => <Post key={post.id} post={post} />)}
      {!isLoading && data && data.length === 0 && (
        <p>No posts found in this subreddit</p>
      )}
    </div>
  );
};

const MainFeed = () => {
  const { data, isLoading, isRefetching } = usePosts();
  useRefetchToast(isRefetching);

  return (
    <div className='my-5 space-y-4'>
      {isLoading && <p>Loading posts...</p>}
      {!isLoading && data?.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

const Feed: FC<{ topic?: string }> = ({ topic }) => {
  if (!topic) return <MainFeed />;

  return <SubredditFeed topic={topic} />;
};

export default Feed;
