import { useState, useEffect } from "react";
import MovieList from "./components/MovieList/MovieList";
import MoviePopup from "./components/MoviePopup/MoviePopup";
import AddMovie from "./components/AddMovie/AddMovie";
import Favorites from "./components/Favorite/Favorite";
import { useWindowWidth } from "./hooks/useWindowWidth";
import { searchMovies } from "./services/Api";
import "./App.css";
import "./index.css";

function App() {
  const width = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Load from Storage (Persistence)
  const [favorites, setFavorites] = useState(() => {
    const savedData = localStorage.getItem("my-watchlist");
    return savedData ? JSON.parse(savedData) : [];
  });

  // Helper to make posters high-resolution (The "4K" Quality Fix)
  const upgradePoster = (movie) => {
    if (movie.poster && movie.poster.includes("SX300")) {
      return { ...movie, poster: movie.poster.replace("SX300", "SX1000") };
    }
    return movie;
  };

  // 2. Initial Search on Load
  useEffect(() => {
    performSearch("dune");
  }, []);

  // 3. Save to Storage whenever Favorites change
  useEffect(() => {
    localStorage.setItem("my-watchlist", JSON.stringify(favorites));
  }, [favorites]);

  const performSearch = async (term = searchTerm) => {
    const finalTerm = term.trim() || "dune";
    setLoading(true);
    setHasSearched(finalTerm !== "dune");

    const results = await searchMovies(finalTerm);
    const highResResults = results.map(upgradePoster);

    setMovies(highResResults);
    setLoading(false);
  };

  // --- PERSISTENT LOGIC (FIXED) ---

  const handleDeleteMovie = (id) => {
    // Targets the favorites list so the change is permanent
    setFavorites(favorites.filter((movie) => (movie.id !== id && movie.imdbID !== id)));
    setSelectedMovie(null);
  };

  const handleUpdateMovie = (id, newTitle) => {
    // Targets the favorites list so the edit is permanent
    setFavorites(favorites.map((m) =>
      (m.id === id || m.imdbID === id) ? { ...m, title: newTitle } : m
    ));
  };

  const handleAddToFavorites = async (movie) => {
    let movieToAdd;

    if (typeof movie === "string") {
      const results = await searchMovies(movie);
      movieToAdd = results.length > 0 ? upgradePoster(results[0]) : { id: Date.now(), title: movie, poster: "N/A" };
    } else if (movie.id && movie.id.toString().startsWith('custom-')) {
      const results = await searchMovies(movie.title);
      if (results && results.length > 0) {
        movieToAdd = upgradePoster(results[0]);
      } else {
        movieToAdd = movie;
      }
    } else {
      movieToAdd = upgradePoster(movie);
    }

    if (!favorites.some((fav) => (fav.id === movieToAdd.id || fav.imdbID === movieToAdd.imdbID))) {
      setFavorites([...favorites, movieToAdd]);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">VELLUM</div>
        <div className="nav-actions">
          {/* THE PREMIUM SEARCH BAR: Stays visible but looks sleek */}
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && performSearch()}
            />
            <button className="search-btn" onClick={() => performSearch()}>🔍</button>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-overlay"></div>
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