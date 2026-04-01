import React from "react";

function MovieItem({ movie, onSelect }) {
    return (
        <li className="movie-card" onClick={() => onSelect(movie)}>
            <img
                src={movie.poster && movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/300x450/181818/FFFFFF?text=No+Poster"}
                alt={movie.title}
            />
            <div className="movie-card-overlay">
                <h3 className="movie-card-title">{movie.title}</h3>
            </div>
        </li>
    );
}

export default MovieItem;