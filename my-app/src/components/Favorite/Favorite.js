import React from 'react';
import MovieList from '../MovieList/MovieList';

function Favorites({ favorites, onSelect }) {
    return (
        <div className="favorites-section">
            <MovieList
                variant="grid"
                movies={favorites}
                onSelect={onSelect}
                emptyMessage="Your watchlist is empty. Add a title above to start your collection."
            />
        </div>
    );
}

export default Favorites;