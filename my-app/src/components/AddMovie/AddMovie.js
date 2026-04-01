import React, { useState } from 'react';

function AddMovie({ onAdd }) {
    const [title, setTitle] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validation (PWD Requirement)
        if (!title.trim()) {
            alert("Please enter a movie title!"); // Simple, but effective
            return;
        }

        const newMovie = {
            id: `custom-${Date.now()}`,
            title: title.trim(),
            // Using a nicer placeholder for a "World Class" look
            poster: "https://via.placeholder.com/300x450/181818/E50914?text=Custom+Movie"
        };

        onAdd(newMovie);

        // 2. User Feedback (PWD Requirement)
        setTitle("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide message after 3s
    };

    return (
        <div className="add-movie-container">
            <form onSubmit={handleSubmit} className="add-movie-form">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a custom movie title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-label="Movie Title"
                    />
                    <button type="submit" className="btn-add">Add to List</button>
                </div>
                {showSuccess && (
                    <p className="success-msg">✨ Movie added successfully!</p>
                )}
            </form>
        </div>
    );
}

export default AddMovie;