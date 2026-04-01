import React from "react";

function MovieItem({ movie, onSelect, onDelete }) {
    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to remove ${movie.title}?`)) {
            onDelete(movie.id);
        }
    };

    return (
        <li className="movie-card" onClick={() => onSelect(movie)}>
            <img src={movie.poster} alt={movie.title} />

            <div className="movie-info">
                <h3>{movie.title}</h3>
            </div>
        </li>
    );
}

export default MovieItem;