import MovieItem from "./MovieItem";

function MovieList({ movies, onDelete, onSelect }) {
    return (
        <div>
            {movies.length === 0 ? (
                <p>No movies yet. Add your first movie!</p>
            ) : (
                <ul>
                    {movies.map((movie) => (
                        <MovieItem
                            key={movie.id}
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