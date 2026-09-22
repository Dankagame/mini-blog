import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Post } from '../types/Post';
import '../styles/Modal.css';

interface NewPostModalProps {
  onClose: () => void;
  onSubmit: (post: Post) => void;
}

function NewPostModal({ onClose, onSubmit }: NewPostModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) return;

    onSubmit({
      id: Date.now(),
      title,
      author,
      content,
      datePosted: new Date().toISOString().slice(0, 10),
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>New Post</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Title
            <input
              className="modal__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Author
            <input
              className="modal__input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Content
            <textarea
              className="modal__textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            />
          </label>
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal__btn modal__btn--primary">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPostModal;
