import { useState, useEffect } from "react";
import MovieList from "./components/MovieList/MovieList";
import MoviePopup from "./components/MovieCard/MoviePopup";
import { useWindowWidth } from "./hooks/useWindowWidth";
import { searchMovies } from "./services/Api";
import "./App.css";
import "./index.css"
function App() {
  const width = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    performSearch("avengers");
  }, []);

  const performSearch = async (term = searchTerm) => {
    const finalTerm = term.trim() || "avengers";
    setLoading(true);
    const results = await searchMovies(finalTerm);
    setMovies(results);
    setLoading(false);
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    setSelectedMovie(null);
  };

  const handleUpdateMovie = (id, newTitle) => {
    setMovies(movies.map((m) => (m.id === id ? { ...m, title: newTitle } : m)));
  };

  return (
    <div>
      <div className="hero">
        <nav className="navbar"><div className="logo">VELLUM</div></nav>
        <div className="hero-content">
          <h1>Unlimited movies, series and more</h1>
          <p>Search your favorite movies instantly</p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && performSearch()}
            />
            <button
              onClick={() => performSearch()}
              className={width < 600 ? "btn-mobile" : "btn-desktop"}
            >
              {width < 600 ? "🔍" : "Search Movie"}
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        <h2>{searchTerm ? "Search Results" : "Trending Movies"}</h2>
        {loading ? (
          <p>Loading movies...</p>
        ) : movies.length === 0 ? (
          <p>No movies found. 🎬</p>
        ) : (
          <MovieList movies={movies} onSelect={setSelectedMovie} />
        )}
      </div>

      {selectedMovie && (
        <MoviePopup
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onDelete={handleDeleteMovie}
          onUpdate={handleUpdateMovie}
        />
      )}
    </div>
  );
}

export default App;