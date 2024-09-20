import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        node {
          id
          title
          content
          likesCount
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function PostList() {
  const [postsPerPage] = useState(10);
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: postsPerPage },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo } = data.posts;

  const loadMore = () => {
    fetchMore({
      variables: {
        first: postsPerPage,
        after: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          posts: {
            ...fetchMoreResult.posts,
            edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
          },
        };
      },
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {edges.map(({ node }) => (
          <div key={node.id} className="border rounded-lg p-4 shadow-md">
            <Link
              to={`/post/${node.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {node.title}
            </Link>
            <p className="mt-2 text-gray-600">
              {node.content.substring(0, 100)}...
            </p>
            <div className="mt-4 flex justify-between items-center">
              <LikeButton postId={node.id} initialLikes={node.likesCount} />
              <span className="text-sm text-gray-500">
                {node.likesCount} likes
              </span>
            </div>
          </div>
        ))}
      </div>
      {pageInfo.hasNextPage && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default PostList;
