import React from 'react';
import MovieList from '../MovieList/MovieList';

function Favorites({ favorites, onSelect }) {
    if (favorites.length === 0) return null; // Hide section if empty (Edge case)

    return (
        <div className="favorites-section">
            <hr />
            <h2>My Watchlist</h2>
            <MovieList movies={favorites} onSelect={onSelect} />
        </div>
    );
}

export default Favorites;