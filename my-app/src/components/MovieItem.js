import { useState } from "react";

function MovieItem({ movie, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(movie.title);

    return (
        <li className="movie-card">
            <img
                src={movie.poster}
                alt={movie.title}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                }}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            ) : (
                <h3>{movie.title}</h3>
            )}

            <div className="buttons">
                {isEditing ? (
                    <button
                        className="save"
                        onClick={() => {
                            if (editedTitle.trim() === "") return;

                            onUpdate(movie.id, editedTitle);
                            setIsEditing(false);
                        }}
                    >
                        Save
                    </button>
                ) : (
                    <button className="edit" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}

                <button className="delete" onClick={() => onDelete(movie.id)}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default MovieItem;