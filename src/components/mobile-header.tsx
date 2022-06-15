import Image from "next/image";
import { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon
} from "@heroicons/react/outline";

const MobileHeader: FC = () => {
  const { data: session } = useSession();

  return (
    <nav
      className='fixed top-16 z-50 right-4 px-4 py-2 space-y-2 bg-white 
      shadow-md rounded-sm'
    >
      <div className='icon-menu'>
        <SparklesIcon className='icon' />
        <p>Powerups</p>
      </div>
      <div className='icon-menu'>
        <GlobeIcon className='icon' />
        <p>Audience</p>
      </div>
      <div className='icon-menu'>
        <VideoCameraIcon className='icon' />
        <p>Video Feed</p>
      </div>
      <hr className='w-full border border-gray-100' />
      <div className='icon-menu'>
        <ChatIcon className='icon' />
        <p>Chat</p>
      </div>
      <div className='icon-menu'>
        <BellIcon className='icon' />
        <p>Notifications</p>
      </div>
      <div className='icon-menu'>
        <PlusIcon className='icon' />
        <p>New Post</p>
      </div>
      <div className='icon-menu'>
        <SpeakerphoneIcon className='icon' />
        <p>Engagement</p>
      </div>
      <div className='icon-menu'>
        {session ? (
          <button onClick={() => signOut()} className='flex items-center gap-2'>
            <div className='relative w-5 h-5 flex-shrink-0'>
              <Image
                src='https://links.papareact.com/23l'
                alt='Reddit icon'
                layout='fill'
                objectFit='contain'
              />
            </div>

            <div className='flex-1 text-sm'>
              <p className='truncate'>{session.user?.name}</p>
              <p>1 Karma</p>
            </div>

            <ChevronDownIcon className='h-5 flex-1 text-gray-400' />
          </button>
        ) : (
          <button
            onClick={() => signIn("reddit")}
            className='flex items-center gap-2'
          >
            <div className='relative w-5 h-5 flex-shrink-0'>
              <Image
                src='https://links.papareact.com/23l'
                alt='Reddit icon'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <p>Sign In</p>
          </button>
        )}
      </div>
    </nav>
  );
};
export default MobileHeader;
