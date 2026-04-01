import { useState, useEffect } from "react";

function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const highResPoster = movie.poster.replace("SX300", "SX1000");
    const year = movie.year || "2026";
    const rating = movie.rating || "13+";
    const duration = movie.duration || "2h 15m";
    const description = movie.description || "In this epic conclusion to the saga, the heroes must gather their strength to save the universe from an ultimate threat.";

    if (!movie) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content netflix-style" onClick={(e) => e.stopPropagation()}>
                <button className="close-x" onClick={onClose}>&times;</button>

                <div className="modal-header-image">
                    <img src={highResPoster} alt={movie.title} />
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
                        <h2 className="movie-title-large">{movie.title}</h2>
                    )}

                    {/* Metadata Row */}
                    <div className="movie-metadata">
                        <span className="year">{year}</span>
                        <span className="age-tag">{rating}</span>
                        <span className="format">HD</span>
                        <span className="genre">Action & Adventure</span>
                    </div>

                    <p className="movie-description">{description}</p>

                    <div className="modal-buttons">
                        {isEditing ? (
                            <>
                                <button className="btn-save" onClick={() => { onUpdate(movie.id, newTitle); setIsEditing(false); }}>Save</button>
                                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button className="btn-edit-trigger" onClick={() => setIsEditing(true)}>Edit Title</button>
                                <button className="btn-delete" onClick={() => { onDelete(movie.id); onClose(); }}>Remove from List</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;