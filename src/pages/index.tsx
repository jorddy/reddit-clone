import { FC } from "react";
import PostBox from "@/components/post-box";
import Feed from "@/components/feed";

const Index: FC = () => {
  return (
    <main className='my-4 container mx-auto px-4'>
      <PostBox />
      <section className='flex'>
        <Feed />
      </section>
    </main>
  );
};

export default Index;
