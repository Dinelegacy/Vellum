import React, { useState } from 'react';

function AddMovie({ onAdd }) {
    const [title, setTitle] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    // Inside your AddMovie component
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newMovie = {
            id: `custom-${Date.now()}`,
            title: title.trim(),
            poster: "https://via.placeholder.com/300x450/181818/E50914?text=Custom+Movie"
        };

        onAdd(newMovie);
        setTitle("");

        // Trigger the Toast
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Update the JSX at the bottom of the return:
    return (
        <div className="add-movie-container">
            <form onSubmit={handleSubmit} className="add-movie-form">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a custom movie title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="submit" className="btn-add">Add to List</button>
                </div>
            </form>

            {/* This is the Toast Notification */}
            <div className={`toast-notification ${showSuccess ? "show" : ""}`}>
                <span className="toast-check">✓</span> {title || "Movie"} added to your watchlist
            </div>
        </div>
    );
}

export default AddMovie;