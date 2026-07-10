import usePosts from "../../hooks/usePosts";
import CreatePost from "../CreatePost/CreatePost";
import PostCard from "../PostCard/PostCard";

function Feed() {
  const { posts, loading, fetchPosts } = usePosts();

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />

      {posts.length === 0 ? (
        <h2>No Posts Yet</h2>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            fetchPosts={fetchPosts}
          />
        ))
      )}
    </>
  );
}

export default Feed;