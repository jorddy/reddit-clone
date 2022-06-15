import { FC } from "react";
import { GetPosts } from "@/backend/data/get-posts";

const Post: FC<{ post: GetPosts[0] }> = ({ post }) => {
  return (
    <article>
      {/* Votes */}
      <div></div>

      <div>
        {/* Header */}

        {/* Body */}

        {/* Image */}

        {/* Footer */}
      </div>
    </article>
  );
};

export default Post;
