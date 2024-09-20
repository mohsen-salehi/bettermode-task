import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
    }
  }
`;

function LikeButton({
  postId,
  initialLikes,
}: {
  postId: string;
  initialLikes: number;
}) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [likePost] = useMutation(LIKE_POST);

  const handleLike = async () => {
    try {
      const { data } = await likePost({ variables: { postId } });
      setLikesCount(data.likePost.likesCount);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Like
    </button>
  );
}

export default LikeButton;
