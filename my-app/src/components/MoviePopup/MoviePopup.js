import { useState, useEffect, useMemo } from "react";
import { getMovieDetails } from "../../services/Api";
import { upgradePosterImageUrl } from "../../utils/movieUtils";

function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
    const [details, setDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(movie.title || "");

    useEffect(() => {
        setNewTitle(movie.title || movie.Title || "");
        setIsEditing(false);
        setDetails(null);
    }, [movie]);

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await getMovieDetails(movie.imdbID || movie.id);
            if (!data || data.Response === "False") {
                setDetails({
                    Title: movie.title || movie.Title,
                    Year: "—",
                    Rated: "—",
                    Runtime: "—",
                    Plot: "Details are not available for this title.",
                    Poster: movie.poster || movie.Poster,
                });
                return;
            }
            setDetails({
                ...data,
                Title: movie.title || data.Title
            });
        };
        if (movie) fetchInfo();
    }, [movie]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== "Escape") return;
            if (isEditing) {
                setIsEditing(false);
                setNewTitle(movie.title || details?.Title || "");
                return;
            }
            onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isEditing, onClose, movie, details]);

    const handleSave = () => {
        const trimmed = newTitle.trim();
        if (!trimmed) return;
        const movieId = movie.imdbID || movie.id;
        onUpdate(movieId, trimmed);
        if (details) setDetails(prev => ({ ...prev, Title: trimmed }));
        setNewTitle(trimmed);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    const posterSrc = useMemo(() => {
        if (!details) return "";
        const fromDetails = details.Poster && details.Poster !== "N/A" ? details.Poster : null;
        const fromMovie = movie.poster || movie.Poster;
        const raw = fromDetails || fromMovie;
        if (!raw) {
            const t = encodeURIComponent(movie.title || movie.Title || "Movie");
            return `https://placehold.co/780x1170/141414/e5e5e5?text=${t}`;
        }
        return upgradePosterImageUrl(raw);
    }, [details, movie]);

    if (!details) return (
        <div className="modal" role="dialog" aria-modal="true" aria-busy="true" aria-label="Loading movie details">
            <div className="loader">Loading…</div>
        </div>
    );

    return (
        <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="movie-popup-title">
            <div className="modal-content netflix-style" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="close-x" onClick={onClose} aria-label="Close">&times;</button>

                <div className="modal-header-image">
                    <img
                        src={posterSrc}
                        alt={details.Title || newTitle}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                    <div className="modal-header-gradient" aria-hidden="true" />
                </div>

                <div className="modal-body">
                    {isEditing ? (
                        <input
                            id="movie-popup-title"
                            className="modal-edit-input"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <h2 id="movie-popup-title" className="movie-title-large">{details.Title}</h2>
                    )}

                    <div className="movie-metadata">
                        <span>{details.Year}</span>
                        <span className="age-tag">{details.Rated}</span>
                        <span>{details.Runtime}</span>
                    </div>

                    <p className="movie-description">{details.Plot}</p>

                    <div className="modal-buttons">
                        {isEditing ? (
                            <>
                                <button type="button" className="btn-save" onClick={handleSave}>Save</button>
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setNewTitle(movie.title || details?.Title || "");
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn-edit-trigger" onClick={() => setIsEditing(true)}>Edit Title</button>
                                <button
                                    type="button"
                                    className="btn-delete"
                                    onClick={() => {
                                        if (window.confirm("Remove this title from your watchlist?")) {
                                            onDelete(movie.imdbID || movie.id);
                                        }
                                    }}
                                >
                                    Remove
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;