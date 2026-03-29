import { useState, useEffect } from "react";

function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        if (movie) {
            setNewTitle(movie.title);
            setIsEditing(false); // Reset to "view mode" when opening a new movie
        }
    }, [movie]);

    if (!movie) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={movie.poster} alt={movie.title} />

                {/* SHOW TITLE OR INPUT BASED ON STATE */}
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="edit-input"
                        autoFocus // Automatically focus the box when it appears
                    />
                ) : (
                    <h2>{movie.title}</h2>
                )}

                <div className="modal-buttons">
                    {isEditing ? (
                        <button className="btn-save" onClick={() => {
                            onUpdate(movie.id, newTitle);
                            setIsEditing(false); // Go back to view mode
                        }}>Save</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    )}

                    <button className="btn-delete" onClick={() => {
                        onDelete(movie.id);
                        onClose();
                    }}>Delete</button>

                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;
