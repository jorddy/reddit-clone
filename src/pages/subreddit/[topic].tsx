import Avatar from "@/components/avatar";
import Feed from "@/components/feed";
import PostBox from "@/components/post-box";
import { useRouter } from "next/router";
import { FC } from "react";

const Subreddit: FC = () => {
  const { query } = useRouter();

  return (
    <main className={`h-24 bg-red-400 p-8`}>
      <section className='-mx-8 mt-10 bg-white'>
        <div className='mx-auto container flex items-center gap-4 pb-3'>
          <div className='-mt-5'>
            <Avatar seed={query.topic as string} large />
          </div>

          <div className='py-2'>
            <h1 className='text-3xl font-semibold'>
              Welcome to the r/{query.topic} subreddit
            </h1>
            <p className='text-sm text-gray-500'>r/{query.topic}</p>
          </div>
        </div>
      </section>

      {query.topic && (
        <section className='mx-auto container mt-5 pb-5'>
          <PostBox subreddit={query.topic as string} />
          <Feed topic={query.topic as string} />
        </section>
      )}
    </main>
  );
};

export default Subreddit;
