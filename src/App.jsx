
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import PostCard from "./components/PostCard.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/posts?limit=9"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.posts);

      } catch (err) {
        setError(
          "Posts could not be loaded. Check your internet connection and try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  function toggleFavorite(postId) {
    setFavorites((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId]
    );
  }

  const visiblePosts = showFavoritesOnly
    ? posts.filter((post) => favorites.includes(post.id))
    : posts;

  return (
    <div className="app-shell">
      <Header
        title="Community Feed"
        subtitle="A small React app powered by live API data."
        favoriteCount={favorites.length}
      />

      <main className="container">
        <section className="intro">
          <div>
            <p className="eyebrow">LATEST POSTS</p>

            <h2>
              Discover what the community is sharing
            </h2>

            <p className="intro-copy">
              Posts below feature English-language content
              from DummyJSON. Save posts you want to come
              back to.
            </p>
          </div>

          <button
            className={`filter-button ${
              showFavoritesOnly ? "active" : ""
            }`}
            onClick={() =>
              setShowFavoritesOnly((current) => !current)
            }
            aria-pressed={showFavoritesOnly}
          >
            {showFavoritesOnly
              ? "Show all posts"
              : "Show saved posts"}
          </button>
        </section>

        {loading && (
          <p className="status">
            Loading posts from the API…
          </p>
        )}

        {error && (
          <p className="status error" role="alert">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          visiblePosts.length === 0 && (
            <p className="status">
              No saved posts yet. Save a post to see it here.
            </p>
          )}

        {!loading &&
          !error &&
          visiblePosts.length > 0 && (
            <section
              className="post-grid"
              aria-label="Community posts"
            >
              {visiblePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isFavorite={favorites.includes(post.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </section>
          )}
      </main>

      <Footer message="Built with React, Vite, and DummyJSON." />
    </div>
  );
}
