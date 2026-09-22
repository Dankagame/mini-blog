import '../styles/Header.css';
import withLogger from './withLogger';

interface HeaderProps {
  onNewPostClick: () => void;
}

function Header({ onNewPostClick }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="logo">Dev Insights</h1>
      <nav>
        <a
          href="#"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            onNewPostClick();
          }}
        >
          New Post
        </a>
      </nav>
    </header>
  );
}

export default withLogger(Header);
