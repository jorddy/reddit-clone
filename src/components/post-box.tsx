import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postValidator, PostValidator } from "@/shared/post-validator";
import { useCreatePost } from "@/backend/mutations/use-create-post";
import Avatar from "./avatar";

const PostBox: FC = () => {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const { data: session } = useSession();
  const { mutate, isLoading } = useCreatePost();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<PostValidator>({
    resolver: zodResolver(postValidator)
  });

  return (
    <form
      onSubmit={handleSubmit(data => mutate(data))}
      className='sticky top-16 z-40 p-2 rounded-md bg-white border border-gray-300'
    >
      <div className='flex items-center gap-3'>
        <Avatar />

        {/* Hidden label for accessibility */}
        <label htmlFor='title' hidden>
          Title:
        </label>
        <input
          {...register("title", { disabled: !session })}
          className='flex-1 p-2 pl-5 bg-gray-50 rounded-sm'
          placeholder={
            session ? "Create a post by entering a title!" : "Sign in to post"
          }
        />
        <p className='text-red-500'>{errors.title?.message}</p>

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-500 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className='h-6 text-gray-500' />
      </div>

      {!!watch("title") && (
        <div className='flex flex-col py-2'>
          <div className='flex items-center px-2'>
            <label htmlFor='body' className='min-w-[90px]'>
              Body:
            </label>
            <input
              {...register("body")}
              className='m-2 p-2 flex-1 bg-blue-50'
              placeholder='Text (optional)'
            />
            <p className='text-red-500'>{errors.body?.message}</p>
          </div>

          <div className='flex items-center px-2'>
            <label htmlFor='subreddit' className='min-w-[90px]'>
              Subreddit:
            </label>
            <input
              {...register("subreddit")}
              className='m-2 p-2 flex-1 bg-blue-50'
              placeholder='e.g. reactjs'
            />
            <p className='text-red-500'>{errors.subreddit?.message}</p>
          </div>

          {imageBoxOpen && (
            <div className='flex items-center px-2'>
              <label htmlFor='image' className='min-w-[90px]'>
                Image URL:
              </label>
              <input
                {...register("image")}
                className='m-2 p-2 flex-1 bg-blue-50'
                placeholder='Optional...'
              />
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='w-full p-2 rounded-full bg-blue-400 
            text-white disabled:opacity-60'
          >
            Create Post
          </button>
        </div>
      )}
    </form>
  );
};

export default PostBox;
