import { FC } from "react";
import { useSubredditsByLimit } from "@/hooks/queries/use-subreddits-by-limit";
import PostBox from "@/components/post-box";
import Feed from "@/components/feed";
import SubredditRow from "@/components/subreddit-row";

const Index: FC = () => {
  const { data, isLoading } = useSubredditsByLimit({ limit: 10 });

  return (
    <main className='my-4 container mx-auto px-4'>
      <PostBox />
      <section className='flex'>
        <Feed />

        {!isLoading && (
          <aside
            className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px]
            rounded-md border border-gray-300 bg-white lg:inline'
          >
            <p className='text-md p-4 font-bold'>Top Communities</p>

            <div>
              {data?.map((subreddit, idx) => (
                <SubredditRow
                  key={subreddit.id}
                  topic={subreddit.topic}
                  idx={idx}
                />
              ))}
            </div>
          </aside>
        )}
      </section>
    </main>
  );
};

export default Index;
