import { FC } from "react";
import { GetPosts } from "@/pages/api/post/get";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon
} from "@heroicons/react/solid";
import { formatRelative } from "date-fns";
import toast from "react-hot-toast";
import Link from "next/link";
import Avatar from "./avatar";
import Comments from "./comments";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import { useAddVote } from "@/hooks/mutations/use-add-vote";

const Post: FC<{
  post: GetPosts[0];
  comments?: boolean;
  isPostPage?: boolean;
}> = ({ post, comments, isPostPage }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddVote(queryClient);

  const userVote = post.votes.find(vote => vote.userId === session?.user.id);

  const upvote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You need to be signed in to vote");
      return;
    }

    mutate({ upvote: isUpvote, postId: post.id, voteId: userVote?.id });
  };

  return (
    <>
      <Link href={`/post/${post.id}`}>
        <a
          className='flex cursor-pointer rounded-md border border-gray-300 bg-white 
          shadow-sm transition hover:border-gray-600'
        >
          {isPostPage && (
            <div
              className='p-4 flex flex-col items-center justify-start gap-1 bg-gray-50 
            text-gray-400 rounded-l-md'
            >
              <button
                disabled={isLoading || userVote?.upvote}
                onClick={() => upvote(true)}
              >
                <ArrowUpIcon
                  className={`vote-button hover:red-text-400 ${
                    userVote?.upvote && "text-red-500"
                  }`}
                />
              </button>
              <p className='text-black font-bold text-sm'>
                {post.votes.length}
              </p>
              <button
                disabled={isLoading || userVote?.upvote === false}
                onClick={() => upvote(false)}
              >
                <ArrowDownIcon
                  className={`vote-button hover:red-blue-400 ${
                    userVote?.upvote === false && "text-blue-500"
                  }`}
                />
              </button>
            </div>
          )}

          <div className={`pb-1 ${isPostPage ? "p-3" : "p-6"}`}>
            <div className='flex items-center gap-2'>
              <Avatar seed={post.subreddit.topic} />
              <p className='text-sm text-gray-400'>
                <Link href={`/subreddit/${post.subreddit.topic}`}>
                  <a
                    className='font-bold text-black transition 
                  hover:text-blue-400 hover:underline'
                  >
                    r/{post.subreddit.topic}
                  </a>
                </Link>
                . Posted by u/{post.user.name}{" "}
                {formatRelative(new Date(post.createdAt), new Date())}
              </p>
            </div>

            <div className='py-4'>
              <h2 className='text-xl font-semibold'>{post.title}</h2>
              <p className='mt-2 text-sm'>{post.body}</p>
            </div>

            {post.image && (
              <img className='w-full' src={post.image} alt={post.title} />
            )}

            <div className='flex flex-wrap gap-0 text-gray-500 sm:gap-4'>
              <div className='post-button'>
                <ChatAltIcon className='w-6 h-6' />
                <p>{post.comments.length} Comments</p>
              </div>
              <div className='post-button'>
                <GiftIcon className='w-6 h-6' />
                <p className='hidden sm:inline'>Award</p>
              </div>
              <div className='post-button'>
                <ShareIcon className='w-6 h-6' />
                <p className='hidden sm:inline'>Share </p>
              </div>
              <div className='post-button'>
                <BookmarkIcon className='w-6 h-6' />
                <p className='hidden sm:inline'>Save</p>
              </div>
              <div className='post-button'>
                <DotsHorizontalIcon className='w-6 h-6' />
              </div>
            </div>
          </div>
        </a>
      </Link>
      {comments && (
        <Comments comments={post.comments as any} postId={post.id} />
      )}
    </>
  );
};

export default Post;
