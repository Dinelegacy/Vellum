import MovieItem from "../MovieItem/MovieItem";

function MovieList({ movies, onDelete, onSelect, emptyMessage, variant = "grid" }) {
    const listClass = variant === "row" ? "movie-row" : "movie-grid";
    return (
        <div>
            {movies.length === 0 ? (
                <p className="movie-list-empty" role="status">{emptyMessage || "No movies yet. Add your first movie!"}</p>
            ) : (
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