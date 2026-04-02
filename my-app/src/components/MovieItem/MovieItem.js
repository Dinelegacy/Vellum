import React from "react";

function MovieItem({ movie, onSelect }) {
    const fallback = "https://placehold.co/300x450/181818/FFFFFF?text=No+Poster";
    const title = movie.title || movie.Title || "Movie";
    let raw = movie.poster || movie.Poster;
    if (raw && typeof raw === "string" && raw.includes("placehold.co{encodeURIComponent")) {
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