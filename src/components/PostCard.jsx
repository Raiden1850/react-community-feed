export default function PostCard({ post, isFavorite, onToggleFavorite }) {
  return (
    <article className="post-card">
      <div className="card-topline">
        <span className="post-number">POST #{post.id}</span>
        <button
          className={`save-button ${isFavorite ? "saved" : ""}`}
          onClick={() => onToggleFavorite(post.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove saved post" : "Save post"}
        >
          {isFavorite ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="card-footer">
        <span>Community member #{post.userId}</span>
        <span className="read-label">Community update</span>
      </div>
    </article>
  );
}