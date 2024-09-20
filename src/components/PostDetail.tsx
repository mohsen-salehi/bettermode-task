import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import LikeButton from "./LikeButton";

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      likesCount
    }
  }
`;

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { post } = data;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-6 flex items-center justify-between">
        <LikeButton postId={post.id} initialLikes={post.likesCount} />
        <span className="text-sm text-gray-500">{post.likesCount} likes</span>
      </div>
    </div>
  );
}

export default PostDetail;
