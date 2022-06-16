import { useRouter } from "next/router";
import { usePostsById } from "@/hooks/queries/use-posts-by-id";
import Post from "@/components/post";
import Loader from "@/components/loader";

const PostPage = () => {
  const { query } = useRouter();
  const post = usePostsById({ id: query.id as string });

  if (post.isLoading) return <Loader />;

  return <main>{post.data && <Post post={post.data} />}</main>;
};

export default PostPage;
