import { useRouter } from "next/router";
import { usePostsById } from "@/hooks/queries/use-posts-by-id";
import Loader from "@/components/loader";
import Post from "@/components/post";

const PostPage = () => {
  const { query } = useRouter();
  const { data, isLoading } = usePostsById({ id: query.id as string });

  if (isLoading) return <Loader />;

  return (
    <main className='my-4 container mx-auto px-4'>
      {data && <Post post={data} comments={true} />}
    </main>
  );
};

export default PostPage;
