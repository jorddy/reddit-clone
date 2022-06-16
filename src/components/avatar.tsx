import Image from "next/image";
import { FC } from "react";
import { useSession } from "next-auth/react";

const Avatar: FC<{ seed?: string; large?: boolean; responsive?: boolean }> = ({
  seed,
  large,
  responsive
}) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-white 
      ${large && "w-20 h-20"} ${responsive && "hidden sm:inline"}`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/bottts/${
          seed || session?.user?.name || "placeholder"
        }.svg`}
        alt='User avatar'
        layout='fill'
        objectFit='contain'
      />
    </div>
  );
};

export default Avatar;
