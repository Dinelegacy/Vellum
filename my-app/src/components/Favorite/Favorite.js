import React from 'react';
import MovieList from '../MovieList/MovieList';

function Favorites({ favorites, onSelect }) {
    if (favorites.length === 0) return null;

    return (
        <div className="favorites-section">
            <MovieList movies={favorites} onSelect={onSelect} />
        </div>
    );
}

export default Favorites;