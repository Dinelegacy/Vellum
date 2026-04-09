import { useState, useEffect, useRef } from "react";
import MovieList from "./components/MovieList/MovieList";
import MoviePopup from "./components/MoviePopup/MoviePopup";
import AddMovie from "./components/AddMovie/AddMovie";
import Favorites from "./components/Favorite/Favorite";
import { searchMovies } from "./services/Api";
import { upgradePoster } from "./utils/movieUtils";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const watchlistRef = useRef(null);
  const addMovieRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // REVIEW: JSON.parse will throw if localStorage data is corrupted.
  // Wrap in try/catch to prevent the entire app from crashing on bad data.
  const [favorites, setFavorites] = useState(() => {
    const savedData = localStorage.getItem("my-watchlist");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      const results = await searchMovies("Batman");
      setMovies(results || []);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    localStorage.setItem("my-watchlist", JSON.stringify(favorites));
  }, [favorites]);

  // REVIEW: No try/catch — if searchMovies throws, setLoading(false) never
  // runs and the UI stays stuck on the loading spinner forever.
  const performSearch = async (term) => {
    const q = term.trim();
    if (!q) return;
    setLoading(true);
    setHasSearched(true);
    const results = await searchMovies(q);
    setMovies(results || []);
    setLoading(false);
  };

  const scrollToWatchlist = () => {
    watchlistRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToAddMovie = () => {
    addMovieRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDeleteMovie = (id) => {
    setFavorites(favorites.filter((m) => m.id !== id && m.imdbID !== id));
    setSelectedMovie(null);
  };

  const handleUpdateMovie = (id, newTitle) => {
    const update = (list) =>
      list.map((m) =>
        m.id === id || m.imdbID === id ? { ...m, title: newTitle } : m,
      );
    setFavorites(update);
    setMovies(update);
    setSelectedMovie((prev) => (prev ? { ...prev, title: newTitle } : null));
  };
  const handleAddToFavorites = async (movieInput) => {
    let movieToAdd;

    if (typeof movieInput === "string") {
      const results = await searchMovies(movieInput);

      if (results && results.length > 0) {
        movieToAdd = upgradePoster(results[0]);
      } else {
        movieToAdd = {
          id: `local-${Date.now()}`,
          title: movieInput,
          poster: `https://placehold.co/300x450/181818/FFFFFF?text=${encodeURIComponent(movieInput)}`,
        };
      }
    } else {
      movieToAdd = upgradePoster(movieInput);
    }

    const isDuplicate = favorites.some(
      (fav) =>
        fav.id === movieToAdd.id ||
        (movieToAdd.imdbID && fav.imdbID === movieToAdd.imdbID),
    );
    if (isDuplicate) {
      return { ok: false, reason: "duplicate" };
    }
    setFavorites((prev) => [...prev, movieToAdd]);
    return { ok: true, title: movieToAdd.title };
  };
  return (
    <div className="app-container">
      {/* REVIEW: Missing aria-label on <nav> — screen readers will announce
          this as an unlabelled navigation region. Add aria-label="Main navigation". */}
      <nav className="navbar">
        {/* REVIEW: The logo is a plain <div>, not a link or heading.
            It should be an <a href="/"> or <h1> so users can navigate home
            and screen readers understand it as the site identity. */}
        <div className="logo">VELLUM</div>
        <div className="nav-actions">
          <div className="search-wrapper">
            <input
              type="search"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && performSearch(searchTerm)}
              aria-label="Search movie titles"
            />
            <button
              type="button"
              className="search-btn"
              onClick={() => performSearch(searchTerm)}
              aria-label="Search movies"
            >
              🔍
            </button>
          </div>
        </div>
      </nav>

      <div className="hero">
        {/* REVIEW: Decorative-only element should have aria-hidden="true"
            so screen readers skip it. */}
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Unlimited movies, series and more</h1>
          <p>Your portal to world-class entertainment.</p>
          <div className="hero-btns">
            {/* REVIEW: The ▶ and ⓘ emoji characters are read aloud by screen
                readers (e.g. "black right-pointing triangle My watchlist").
                Wrap each emoji in <span aria-hidden="true"> to hide it,
                or use a proper SVG icon with aria-hidden. */}
            <button
              type="button"
              className="btn-play"
              onClick={scrollToWatchlist}
            >
              ▶ My watchlist
            </button>
            <button
              type="button"
              className="btn-info"
              onClick={scrollToAddMovie}
            >
              ⓘ Add a movie
            </button>
          </div>
        </div>
      </div>

      <div className="content-area">
        <section className="admin-section" ref={addMovieRef}>
          <AddMovie onAdd={handleAddToFavorites} />
        </section>

        <section
          className="row"
          ref={watchlistRef}
          aria-labelledby="watchlist-heading"
        >
          <div className="cinematic-separator"></div>
          <h2 id="watchlist-heading">My Watchlist</h2>
          <Favorites favorites={favorites} onSelect={setSelectedMovie} />
        </section>

        <section
          className="row trending-shelf"
          aria-labelledby="discovery-heading"
        >
          <div className="cinematic-separator"></div>
          <h2 id="discovery-heading">
            {hasSearched ? `Results for: ${searchTerm}` : "Trending Movies"}
          </h2>
          {loading ? (
            <div className="loader" role="status" aria-live="polite">
              Loading…
            </div>
          ) : movies.length > 0 ? (
            <MovieList
              movies={movies}
              onSelect={setSelectedMovie}
              variant="row"
            />
          ) : (
            <p className="no-results" role="status">
              {hasSearched
                ? `No results for "${searchTerm.trim()}". Try another title.`
                : "Nothing to show yet. Use search above or wait for the list to load."}
            </p>
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
