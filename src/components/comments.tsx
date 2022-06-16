import { useSession } from "next-auth/react";

const Comments = () => {
  const { data: session } = useSession();

  return (
    <div className='rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
      <p>
        Comment as <span>{session?.user?.name}</span>
      </p>
    </div>
  );
};

export default Comments;
