import MovieItem from "../MovieItem/MovieItem";

// REVIEW: onDelete is accepted as a prop and forwarded to MovieItem, but
// MovieItem's signature is ({ movie, onSelect }) — it never uses onDelete.
// This is a dead prop that creates a false expectation that deletion works
// at the card level.
function MovieList({
  movies,
  onDelete,
  onSelect,
  emptyMessage,
  variant = "grid",
}) {
  const listClass = variant === "row" ? "movie-row" : "movie-grid";
  return (
    <div>
      {movies.length === 0 ? (
        <p className="movie-list-empty" role="status">
          {emptyMessage || "No movies yet. Add your first movie!"}
        </p>
      ) : (
        // REVIEW: Missing aria-label on <ul> — screen readers will
        // announce "list, 10 items" with no description of what the list
        // contains. Add aria-label="Movie list" or similar.
        <ul className={listClass}>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id || movie.imdbID}
              movie={movie}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
