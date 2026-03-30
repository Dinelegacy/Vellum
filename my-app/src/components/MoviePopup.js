import { useState, useEffect } from "react";

function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        if (movie) {
            setNewTitle(movie.title);
            setIsEditing(false);
        }
    }, [movie]);

    if (!movie) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* THE X BUTTON */}
                <button className="close-x" onClick={onClose}>&times;</button>

                <img src={movie.poster} alt={movie.title} />

                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="edit-input"
                        autoFocus
                    />
                ) : (
                    <h2>{movie.title}</h2>
                )}

                <div className="modal-buttons">
                    {isEditing ? (
                        <button className="btn-save" onClick={() => {
                            onUpdate(movie.id, newTitle);
                            setIsEditing(false);
                        }}>Save</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    )}

                    <button className="btn-delete" onClick={() => {
                        onDelete(movie.id);
                        onClose();
                    }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;