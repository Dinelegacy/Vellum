import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import { useWindowWidth } from "./useWindowWidth";
import "./App.css";
import MoviePopup from "./components/MoviePopup";

function App() {
  const width = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    handleSearch("avengers", false);
  }, []);

  const handleSearch = (term = searchTerm, isUserSearch = true) => {
    if (typeof term !== "string" || term.trim() === "") return;

    setLoading(true);

    fetch(`https://www.omdbapi.com/?s=${term}&apikey=5328cf5d`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          // Removes duplicates based on imdbID
          const uniqueMovies = data.Search.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID)
          );

          const formattedMovies = uniqueMovies.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com"
          }));

          setMovies(formattedMovies);
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMovies([]);
      })
      .finally(() => {
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
      {/* HERO SECTION */}
      <div className="hero">
        <nav className="navbar">
          <div className="logo">VELLUM</div>
        </nav>

        <div className="hero-content">
          <h1>Unlimited movies, series and more</h1>
          <p>Search your favorite movies instantly</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search movie..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);

                if (value.trim() === "") {
                  handleSearch("avengers", false);
                  setQuery("");
                }
              }}
              /* FIX: LISTENS FOR ENTER KEY */
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={() => handleSearch()}
              className={width < 600 ? "btn-mobile" : "btn-desktop"}
            >
              {width < 600 ? "🔍" : "Search Movie"}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <h2>
          {searchTerm ? "Search Results" : "Trending Movies"}
        </h2>

        {loading ? (
          <div>
            <div className="loader"></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <p>No movies found. Try another search 🎬</p>
            ) : (
              <MovieList
                movies={movies}
                onDelete={handleDeleteMovie}
                onSelect={setSelectedMovie}
              />
            )}
          </>
        )}
      </div>

      <MoviePopup
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onDelete={handleDeleteMovie}
        onUpdate={handleUpdateMovie}
      />
    </div>
  );
}

export default App;
