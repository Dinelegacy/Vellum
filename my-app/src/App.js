import { useState, useEffect } from "react";
import MovieList from "./components/MovieList/MovieList";
import MoviePopup from "./components/MoviePopup/MoviePopup";
import AddMovie from "./components/AddMovie/AddMovie";
import Favorites from "./components/Favorite/Favorite";
import { useWindowWidth } from "./hooks/useWindowWidth";
import { searchMovies } from "./services/Api";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const savedData = localStorage.getItem("my-watchlist");
    return savedData ? JSON.parse(savedData) : [];
  });

  const upgradePoster = (movie) => {
    if (movie?.poster?.includes("SX300")) {
      return { ...movie, poster: movie.poster.replace("SX300", "SX1000") };
    }
    return movie;
  };
  // Change the function signature to handle empty terms better
  const performSearch = async (term) => {
    // If term is empty or not a string, default to "dune"
    const finalTerm = (typeof term === 'string' && term.trim() !== "") ? term.trim() : "dune";

    setLoading(true);
    setHasSearched(finalTerm !== "dune");

    try {
      const results = await searchMovies(finalTerm);
      // Add a console.log here to see what the API is actually sending back!
      console.log("API Results:", results);

      // Ensure results is an array before mapping
      const highResResults = Array.isArray(results) ? results.map(upgradePoster) : [];
      setMovies(highResResults);
    } catch (error) {
      console.error("Search failed:", error);
      setMovies([]); // Clear movies on error
    } finally {
      setLoading(false);
    }
  };

  // Ensure the initial call is explicit
  useEffect(() => {
    performSearch("dune");
  }, []);


  useEffect(() => {
    localStorage.setItem("my-watchlist", JSON.stringify(favorites));
  }, [favorites]);

  const handleDeleteMovie = (id) => {
    setFavorites(favorites.filter((m) => (m.id !== id && m.imdbID !== id)));
    setSelectedMovie(null);
  };

  const handleUpdateMovie = (id, newTitle) => {
    const update = (list) => list.map(m => (m.id === id || m.imdbID === id) ? { ...m, title: newTitle } : m);
    setFavorites(update);
    setMovies(update);
    setSelectedMovie(prev => prev ? { ...prev, title: newTitle } : null);
  };

  const handleAddToFavorites = async (movie) => {
    let movieToAdd;
    if (typeof movie === "string") {
      const results = await searchMovies(movie);
      movieToAdd = results.length > 0 ? upgradePoster(results[0]) : { id: Date.now(), title: movie, poster: "N/A" };
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
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && performSearch(searchTerm)}
            />
            <button className="search-btn" onClick={() => performSearch(searchTerm)}>🔍</button>
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
            <div className="cinematic-separator"></div>
            <h2>My Watchlist</h2>
            <Favorites favorites={favorites} onSelect={setSelectedMovie} />
          </section>
        )}

        <section className="row">
          <div className="cinematic-separator"></div>
          <h2>{hasSearched ? `Results for: ${searchTerm}` : "Trending Movies"}</h2>
          {loading ? (
            <div className="loader">Loading...</div>
          ) : movies.length > 0 ? (
            <MovieList movies={movies} onSelect={setSelectedMovie} />
          ) : (
            <p className="no-results">No movies found. Try searching for something else!</p>
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
      <Footer />
    </div>
  );
}

export default App;