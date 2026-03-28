import { useState } from "react";

function MovieItem({ movie, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(movie.title);

    return (
        <li>
            <img src={movie.poster} alt={movie.title} />

            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            ) : (
                movie.title
            )}

            <button onClick={() => setIsEditing(true)}>Edit</button>

            <button onClick={() => onDelete(movie.id)}>Delete</button>
        </li>
    );
}

export default MovieItem;