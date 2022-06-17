import { FC } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "react-query";
import { commentValidator, CommentValidator } from "@/shared/comment-validator";
import { useAddComment } from "@/hooks/mutations/use-add-comment";
import { Comment, User } from "@prisma/client";
import { formatRelative } from "date-fns";
import Avatar from "./avatar";

const Comments: FC<{
  comments: (Comment & { user: User })[];
  postId: string;
}> = ({ comments, postId }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddComment(queryClient);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CommentValidator>({
    defaultValues: { postId: postId },
    resolver: zodResolver(commentValidator)
  });

  return (
    <div className='rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
      <p className='text-sm'>
        Comment as <span className='text-red-500'>{session?.user?.name}</span>
      </p>

      <form
        onSubmit={handleSubmit(data => {
          mutate(data);
          reset();
        })}
        className='mt-2 flex flex-col gap-4'
      >
        <textarea
          {...register("comment")}
          className='h-24 rounded-md border border-gray-200 p-2 pl-4 disabled:bg-gray-50'
          disabled={!session}
          placeholder={
            session ? "What are your thoughts" : "Please sign in to comment"
          }
        />
        {errors.comment && (
          <p className='text-red-500'>{errors.comment.message}</p>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200'
        >
          Comment
        </button>
      </form>

      <div className='py-5 px-10'>
        <hr className='py-2' />

        {comments.map(comment => (
          <div
            key={comment.id}
            className='relative flex items-center gap-2 space-y-5 group'
          >
            <hr className='absolute top-10 h-16 border left-5 z-0 group-last:hidden' />
            <div className='z-50'>
              <Avatar seed={comment.user.name || "Anonymous"} />
            </div>

            <div className='flex flex-col'>
              <p className='py-2 text-sm text-gray-500'>
                <span className='font-semibold text-gray-600'>
                  {comment.user.name}
                </span>{" "}
                {formatRelative(new Date(comment.createdAt), new Date())}
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
