import { useState } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import NewPostModal from './components/NewPostModal';
import type { Post } from './types/Post';
import './App.css';

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    author: 'Alice',
    content: 'Hooks let you use state and lifecycle features in functional components without writing a class.',
    datePosted: new Date().toISOString().slice(0, 10),
  },
  {
    id: 2,
    title: 'TypeScript Generics Explained',
    author: 'Bob',
    content: 'Generics allow you to write reusable code that works with multiple types while staying type-safe.',
    datePosted: '2025-01-10',
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox',
    author: 'Alice',
    content: 'Grid is best for two-dimensional layouts, while Flexbox shines for one-dimensional arrangements.',
    datePosted: '2025-01-08',
  },
];

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="app">
      <Header onNewPostClick={() => setIsModalOpen(true)} />
      <main className="container">
        <PostList posts={posts} />
      </main>
      {isModalOpen && (
        <NewPostModal onClose={() => setIsModalOpen(false)} onSubmit={handleNewPost} />
      )}
    </div>
  );
}

export default App;
