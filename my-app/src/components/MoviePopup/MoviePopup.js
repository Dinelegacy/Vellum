import { useState, useEffect } from "react";
import { getMovieDetails } from "../../services/Api";

function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
    const [details, setDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(movie.title || "");

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await getMovieDetails(movie.imdbID || movie.id);
            setDetails({
                ...data,
                Title: movie.title || data.Title
            });

            if (!newTitle) setNewTitle(movie.title || data.Title);
        };
        if (movie) fetchInfo();

        // This line below is exactly what fixes the warning:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie]);

    const handleSave = () => {
        const movieId = movie.imdbID || movie.id;
        onUpdate(movieId, newTitle);

        setDetails(prev => ({ ...prev, Title: newTitle }));
        setIsEditing(false);
    };

    if (!details) return (
        <div className="modal"><div className="loader">Loading...</div></div>
    );

    const highResPoster = details.Poster && details.Poster !== "N/A"
        ? details.Poster.replace("SX300", "SX1000")
        : movie.poster;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content netflix-style" onClick={(e) => e.stopPropagation()}>
                <button className="close-x" onClick={onClose}>&times;</button>

                <div className="modal-header-image">
                    <img src={movie.poster || highResPoster} alt={newTitle} />
                    <div className="modal-overlay-bottom"></div>
                </div>

                <div className="modal-body">
                    {isEditing ? (
                        <input
                            className="modal-edit-input"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            autoFocus
                        />
                    ) : (

                        <h2 className="movie-title-large">{details.Title}</h2>
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
                                <button className="btn-save" onClick={handleSave}>Save</button>
                                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button className="btn-edit-trigger" onClick={() => setIsEditing(true)}>Edit Title</button>
                                <button className="btn-delete" onClick={() => { onDelete(movie.imdbID || movie.id); }}>Remove</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;