import { FC } from "react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import Avatar from "./avatar";
import Link from "next/link";

const SubredditRow: FC<{ topic: string; idx: number }> = ({ topic, idx }) => {
  return (
    <div className='flex items-center gap-2 border-t bg-white px-4 py-2 last:rounded-b'>
      <p>{idx + 1}</p>
      <ChevronUpIcon className='w-4 h-4 flex-shrink-0 text-gray-400' />
      <Avatar seed={`/subreddit/${topic}`} />
      <p className='flex-1 truncate'>r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <a className='cursor-pointer rounded-full bg-blue-500 px-3 text-white'>
          View
        </a>
      </Link>
    </div>
  );
};

export default SubredditRow;
