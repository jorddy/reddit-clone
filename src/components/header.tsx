import Image from "next/image";
import {
  MenuIcon,
  ChevronDownIcon,
  HomeIcon,
  SearchIcon
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon
} from "@heroicons/react/outline";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>
        <div className='relative w-20 cursor-pointer'>
          <Image
            src='https://links.papareact.com/fqy'
            alt='Reddit logo'
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div className='mx-7 flex items-center xl:min-w-[300px]'>
          <HomeIcon className='w-5 h-5' />
          <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
          <ChevronDownIcon className='w-5 h-5' />
        </div>

        <form
          className='flex flex-1 items-center space-x-2 border border-gray-200 
        rounded-sm bg-gray-100 px-3 py-1 focus-within:outline focus-within:outline-gray-800'
        >
          <SearchIcon className='w-6 h-6 text-gray-400' />
          {/* Hidden label for accessibility */}
          <label htmlFor='search' hidden>
            Search Reddit
          </label>
          <input
            className='flex-1 bg-transparent focus:outline-none'
            type='text'
            name='search'
            id='search'
            placeholder='Search Reddit'
          />
          <button type='submit' hidden></button>
        </form>

        <nav className='mx-5 hidden items-center text-gray-500 space-x-2 lg:inline-flex'>
          <SparklesIcon className='icon' />
          <GlobeIcon className='icon' />
          <VideoCameraIcon className='icon' />
          <hr className='h-10 border border-gray-100' />
          <ChatIcon className='icon' />
          <BellIcon className='icon' />
          <PlusIcon className='icon' />
          <SpeakerphoneIcon className='icon' />
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='ml-5 flex items-center lg:hidden'
        >
          <MenuIcon className='icon' />
        </button>

        {session ? (
          <button
            onClick={() => signOut()}
            className='hidden space-x-2 border border-gray-100 p-2 cursor-pointer 
            lg:flex lg:items-center'
          >
            <div className='relative w-5 h-5 flex-shrink-0'>
              <Image
                src='https://links.papareact.com/23l'
                alt='Reddit icon'
                layout='fill'
                objectFit='contain'
              />
            </div>

            <div className='flex-1 text-xs'>
              <p className='truncate'>{session.user?.name}</p>
              <p>1 Karma</p>
            </div>

            <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400' />
          </button>
        ) : (
          <button
            onClick={() => signIn("reddit")}
            className='hidden space-x-2 border border-gray-100 p-2 cursor-pointer 
            lg:flex lg:items-center'
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
      </header>

      {isMenuOpen && (
        <nav className='fixed top-16 right-4 px-4 py-2 space-y-2 bg-white shadow-md rounded-sm'>
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
              <button
                onClick={() => signOut()}
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

                <div className='flex-1 text-sm'>
                  <p className='truncate'>{session.user?.name}</p>
                  <p>1 Karma</p>
                </div>

                <ChevronDownIcon className='h-5 flex-1 text-gray-400' />
              </button>
            ) : (
              <button
                onClick={() => signIn("reddit")}
                className='hidden space-x-2 border border-gray-100 p-2 cursor-pointer 
                lg:flex lg:items-center'
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
      )}
    </>
  );
}
