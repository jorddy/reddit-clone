import { FC } from "react";
import { usePosts } from "@/hooks/queries/use-posts";
import { useRefetchToast } from "@/hooks/use-refetch-toast";
import { usePostsByTopic } from "@/hooks/queries/use-posts-by-topic";
import Post from "./post";
import Loader from "./loader";

const SubredditFeed: FC<{ topic: string }> = ({ topic }) => {
  const { data, isLoading, isRefetching } = usePostsByTopic({ topic });
  useRefetchToast(isRefetching);

  return (
    <div className='my-5 space-y-4'>
      {isLoading && <Loader />}
      {!isLoading && data!.length === 0 && (
        <p>No posts found in this subreddit</p>
      )}
      {!isLoading &&
        data!.length > 0 &&
        data?.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

const MainFeed = () => {
  const { data } = usePosts();

  return (
    <div className='my-5 space-y-4'>
      {data?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const Feed: FC<{ topic?: string }> = ({ topic }) => {
  if (!topic) return <MainFeed />;

  return <SubredditFeed topic={topic} />;
};

export default Feed;
