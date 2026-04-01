import { useState, useEffect } from "react";
import MovieList from "./components/MovieList/MovieList";
import MoviePopup from "./components/MoviePopup/MoviePopup";
import MovieItem from "./components/MovieItem/MovieItem";
import AddMovie from "./components/AddMovie/AddMovie";
import Favorites from "./components/Favorite/Favorite";
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
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    performSearch("avengers");
  }, []);

  const performSearch = async (term = searchTerm) => {
    const finalTerm = term.trim() || "avengers";

    setLoading(true);
    setHasSearched(finalTerm !== "avengers"); // 👈 KEY LINE

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
  const handleAddToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
      // This alert provides "Feedback for user actions" (Requirement)
      alert(`${movie.title} added to Favorites!`);
    } else {
      alert("This movie is already in your favorites.");
    }
  };

  // Replace your return statement in App.js with this cleaner structure
  return (
    <div className="app-container">
      {/* FIXED NAVBAR: Distinction for UI focus */}
      <nav className="navbar">
        <div className="logo">VELLUM</div>
        <div className="nav-actions">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && performSearch()}
            />
            <button onClick={() => performSearch()}>🔍</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: Now purely cinematic */}
      <div className="hero">
        <div className="hero-overlay"></div> {/* Add this for the fade effect */}
        <div className="hero-content">
          <h1>Unlimited movies, series and more</h1>
          <p>Your portal to world-class entertainment.</p>
          <div className="hero-btns">
            <button className="btn-play">▶ Play</button>
            <button className="btn-info">ⓘ More Info</button>
          </div>
        </div>
      </div>

      <div className="content-area">
        {/* ADD MOVIE: Distinction for UX - keep it separate or in a modal */}
        <section className="admin-section">
          <AddMovie onAdd={handleAddToFavorites} />
        </section>

        {favorites.length > 0 && (
          <section className="row">
            <Favorites favorites={favorites} onSelect={setSelectedMovie} />
          </section>
        )}

        <section className="row">
          <h2>{hasSearched ? `Results for: ${searchTerm}` : "Trending Movies"}</h2>
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <MovieList movies={movies} onSelect={setSelectedMovie} />
          )}
        </section>
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