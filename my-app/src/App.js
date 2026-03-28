import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import { useWindowWidth } from "./useWindowWidth";
import "./App.css";

function App() {
  const width = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
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
          const formattedMovies = data.Search.map((movie) => ({
            id: movie.imdbID, // Fixed: OMDB uses imdbID
            title: movie.Title,
            poster:
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
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
        {/* LOGO ADDED HERE */}
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
                  handleSearch("avengers", false); // reset to trending
                  setQuery(""); // remove "Search Results"
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
                onUpdate={handleUpdateMovie}
                onSelect={() => { }} // Add this line to stop the "onSelect is not a function" error
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;