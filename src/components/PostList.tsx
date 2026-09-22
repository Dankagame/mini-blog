import Post from './Post';
import type { Post as PostType } from '../types/Post';

interface PostListProps {
  posts: PostType[];
}

function PostList({ posts }: PostListProps) {
  return (
    <section className="post-list">
      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostList;
