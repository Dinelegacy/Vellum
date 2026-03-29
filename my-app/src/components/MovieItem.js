import { useState } from "react";

function MovieItem({ movie, onSelect }) {
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
