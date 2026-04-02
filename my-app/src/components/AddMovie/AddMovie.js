import React, { useState } from 'react';

function AddMovie({ onAdd }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
            setError("Please enter a movie title.");
            return;
        }
        setError("");

        const result = await Promise.resolve(onAdd(trimmed));
        if (result?.ok === false && result.reason === "duplicate") {
            setToast({ type: "info", text: `"${trimmed}" is already in your watchlist.` });
            setTimeout(() => setToast(null), 4000);
            return;
        }
        if (result?.ok) {
            setToast({ type: "success", text: `${result.title || trimmed} added to your watchlist.` });
            setTitle("");
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <div className="add-movie-container">
            <form onSubmit={handleSubmit} className="add-movie-form" noValidate>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a movie to your watchlist..."
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError("");
                        }}
                        aria-invalid={!!error}
                        aria-describedby={error ? "add-movie-error" : undefined}
                    />
                    <button type="submit" className="btn-add">Add to list</button>
                </div>
                {error && (
                    <p id="add-movie-error" className="form-error" role="alert">{error}</p>
                )}
            </form>

            {toast && (
                <div
                    className={`toast-notification ${toast.type === "success" ? "toast-success" : "toast-info"} show`}
                    role="status"
                    aria-live="polite"
                >
                    {toast.type === "success" && <span className="toast-check">✓</span>}
                    {toast.text}
                </div>
            )}
        </div>
    );
}

export default AddMovie;
