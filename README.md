# Dev Insights — Mini Blog

An internal "Mini Blog" for the fictional startup **Dev Insights**, where employees can browse quick posts and add new ones. Built with **React + TypeScript + Vite** (no starter template used beyond the base Vite scaffold).

## Installation & Running

This project uses [Vite](https://vitejs.dev) as the build tool and dev server.

```bash
git clone <your-repo-url>
cd mini-blog
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) in your browser.

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Testing

No automated tests are included in this formative assessment. The app was manually tested in the browser (adding posts through the popup, checking conditional styling, checking the console for errors).

## Project Structure

```
src/
├── components/
│   ├── Header.tsx         # logo + "New Post" trigger
│   ├── Post.tsx            # single post card
│   ├── PostList.tsx        # renders a list of posts
│   ├── NewPostModal.tsx    # popup form for creating a post
│   └── withLogger.tsx      # HOC that logs mount/unmount
├── styles/                 # one CSS file per component
├── types/
│   └── Post.tsx             # shared Post type
└── App.tsx                  # root component, owns app state
```

## Component Choices

All components are **functional components** using hooks, which is the modern React standard: they're shorter, easier to test, and support hooks like `useState`. Class components would only make sense when maintaining legacy code, which doesn't apply here.

- **Header** — displays the "Dev Insights" logo and a "New Post" link. Clicking it opens the `NewPostModal` popup (via an `onNewPostClick` prop passed down from `App`).
- **Post** — renders a single post's title, author, date, and a short content preview. Wrapped in `React.memo` so it only re-renders when its own `post` prop changes.
- **PostList** — receives the array of posts as a prop and renders a `Post` for each one.
- **NewPostModal** — a popup form (title, author, content) for creating a new post. On submit, it builds a new `Post` object (today's date, a generated id) and hands it back to `App`; it closes on Cancel, the × button, clicking outside the modal, or a successful submit.
- **App** — the root component. Owns the `posts` array and `isModalOpen` state, and renders `Header`, `PostList`, and (conditionally) `NewPostModal`.

## TypeScript

The `Post` type (`src/types/Post.tsx`) defines the shape used across all components:

```ts
interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  datePosted: string;
}
```

## Styling

Two styling methods are used:

- **External CSS files** — one per component (`Header.css`, `Post.css`, `Modal.css`, `App.css`).
- **Inline styles** — the "New!" badge in `Post.tsx` is styled inline via a `style` object.

**Conditional styling:** a post shows a red "New!" badge next to its title if it was posted within the last 24 hours (checked by comparing `datePosted` against the current time).

## Optimization & HOC

- `Post` is wrapped in `React.memo` to avoid unnecessary re-renders when the posts list changes but an individual post's props haven't.
- Each post in `PostList` is rendered with a unique `key={post.id}`.
- `withLogger.tsx` is a higher-order component that logs a message to the console when the component it wraps mounts and unmounts.

## Challenges

- **Invisible input text in the popup:** the leftover Vite template CSS set `color-scheme: light dark` globally. On a browser in dark mode, that made native form-control text render white by default — so typed text was invisible against the modal's white background even though it was being entered correctly. Fixed by explicitly setting `color` and `color-scheme: light` on the modal's inputs.
- **Sharing post state between the modal and the list:** since `Header` (which triggers the popup) and `PostList` (which displays posts) are siblings, the posts array and modal-open flag were lifted up into `App` so a submitted post can be added to the list and shown immediately.

## External Libraries

None beyond what Vite's React + TypeScript scaffold includes: `react`, `react-dom`, `typescript`.
