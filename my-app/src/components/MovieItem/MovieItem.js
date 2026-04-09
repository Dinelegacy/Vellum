import React from "react";

function MovieItem({ movie, onSelect }) {
  const fallback = "https://placehold.co/300x450/181818/FFFFFF?text=No+Poster";
  const title = movie.title || movie.Title || "Movie";
  let raw = movie.poster || movie.Poster;
  // REVIEW: This check catches a malformed URL string that was persisted to
  // localStorage from a previous bug. The condition works but is brittle —
  // it silently patches bad data at render time instead of sanitizing it when
  // it enters the system (in upgradePoster or handleAddToFavorites).
  if (
    raw &&
    typeof raw === "string" &&
    raw.includes("placehold.co{encodeURIComponent")
  ) {
    raw = `https://placehold.co/300x450/181818/FFFFFF?text=${encodeURIComponent(title)}`;
  }
  const src = raw && raw !== "N/A" ? raw : fallback;

  const activate = () => onSelect(movie);

  const onCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  };

  // REVIEW: Using <li role="button"> overrides the native list-item semantics.
  // Screen readers will announce this as "button" rather than "list item 3 of 10".
  // Users lose context about their position in the list. Consider keeping the <li>
  // semantics and nesting a <button> inside, or using role="option" in a listbox.
  return (
    <li
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={activate}
      onKeyDown={onCardKeyDown}
      aria-label={`Open details: ${title}`}
    >
      <img
        src={src}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallback;
        }}
      />
      <div className="movie-card-overlay">
        <h3 className="movie-card-title">{title}</h3>
      </div>
    </li>
  );
}

export default MovieItem;
