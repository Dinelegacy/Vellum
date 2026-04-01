import { useState, useEffect } from "react";
// This brings in the function to get the real Plot and Rating
import { getMovieDetails } from "../../services/Api";

function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
    const [details, setDetails] = useState(null); // Real movie data (Plot, Rated, etc.)
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(movie.Title || movie.title);

    useEffect(() => {
        const fetchInfo = async () => {
            // We use the movie's unique ID to fetch the deep information
            const data = await getMovieDetails(movie.imdbID || movie.id);
            setDetails(data);
        };
        if (movie) fetchInfo();
    }, [movie]);

    // 1. LOADING STATE: Shows while waiting for the API
    if (!details) return (
        <div className="modal">
            <div className="loader">Loading Cinematic Details...</div>
        </div>
    );

    // 2. IMAGE QUALITY FIX: Changes the low-res "300" to high-res "1000"
    const highResPoster = details.Poster && details.Poster !== "N/A"
        ? details.Poster.replace("SX300", "SX1000")
        : "https://via.placeholder.com/1000x1500?text=No+Image+Available";

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content netflix-style" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="close-x" onClick={onClose}>&times;</button>

                {/* Wide Cinematic Header */}
                <div className="modal-header-image">
                    <img src={highResPoster} alt={details.Title} />
                    <div className="modal-overlay-bottom"></div>
                </div>

                <div className="modal-body">
                    {/* Title Section (Edit Mode Logic) */}
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

                    {/* REAL DATA: Fetched from the API */}
                    <div className="movie-metadata">
                        <span className="year">{details.Year}</span>
                        <span className="age-tag">{details.Rated}</span>
                        <span className="runtime">{details.Runtime}</span>
                        <span className="format">HD</span>
                    </div>

                    {/* REAL DESCRIPTION: The 'Plot' from OMDB */}
                    <p className="movie-description">{details.Plot}</p>

                    {/* Action Buttons */}
                    <div className="modal-buttons">
                        {isEditing ? (
                            <>
                                <button className="btn-save" onClick={() => { onUpdate(movie.imdbID || movie.id, newTitle); setIsEditing(false); }}>Save</button>
                                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button className="btn-edit-trigger" onClick={() => setIsEditing(true)}>Edit Title</button>
                                <button className="btn-delete" onClick={() => { onDelete(movie.imdbID || movie.id); onClose(); }}>Remove from List</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;