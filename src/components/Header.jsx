export default function Header({ title, subtitle, favoriteCount }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Community Feed home">
          <span className="brand-mark">C</span>
          <span>Community</span>
        </a>
        <div className="header-summary">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="saved-count" aria-live="polite">
          <span>{favoriteCount}</span> saved
        </div>
      </div>
    </header>
  );
}