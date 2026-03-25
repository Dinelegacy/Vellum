import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import { useWindowWidth } from "./useWindowWidth";
import "./App.css";

function App() {
  const width = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;

    setLoading(true);

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=5328cf5d`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          const formattedMovies = data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster
          }));

          setMovies(formattedMovies);
        } else {
          setMovies([]);
        }

        setLoading(false);
      });
  };

  const handleDeleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };
  const handleUpdateMovie = (id, newTitle) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, title: newTitle } : movie
    );

    setMovies(updatedMovies);
  };

  return (
    <div>
      <h1> My Movie App </h1>
      <input
        type="text"
        placeholder="Search movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className={width < 600 ? "btn-mobile" : "btn-desktop"}
      >
        {width < 600 ? "🔍" : "Search Movie"}
      </button>

      {loading ? (
        <div>
          <div className="loader"></div>
          <p>Loading movies...</p>
        </div>
      ) : (
        <MovieList
          movies={movies}
          onDelete={handleDeleteMovie}
          onUpdate={handleUpdateMovie}
        />
      )}
    </div>
  );
}

export default App;