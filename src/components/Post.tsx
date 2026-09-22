import React from 'react';
import type { Post as PostType } from '../types/Post';
import '../styles/Post.css';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const isNew = (() => {
    const posted = new Date(post.datePosted).getTime();
    const now = Date.now();
    return now - posted < 24 * 60 * 60 * 1000;
  })();

  const badgeStyle: React.CSSProperties = {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    marginLeft: '8px',
  };

  const preview = post.content.split(' ').slice(0, 8).join(' ') + '...';

  return (
    <article className="post">
      <h2 className="post__title">
        {post.title}
        {isNew && <span style={badgeStyle}>New!</span>}
      </h2>
      <p className="post__meta">
        By <strong>{post.author}</strong> on {post.datePosted}
      </p>
      <p className="post__preview">{preview}</p>
    </article>
  );
};

export default React.memo(Post);
