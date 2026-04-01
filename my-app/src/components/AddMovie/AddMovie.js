import React, { useState } from 'react';

function AddMovie({ onAdd }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Basic validation (PWD requirement)

        const newMovie = {
            id: `custom-${Date.now()}`, // Unique ID
            title: title,
            poster: "https://placeholder.com"
        };

        onAdd(newMovie);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="add-movie-form">
            <input
                type="text"
                placeholder="Add a custom movie title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add to List</button>
        </form>
    );
}

export default AddMovie;