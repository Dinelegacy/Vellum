import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import { useWindowWidth } from "./useWindowWidth";
import "./App.css";

function App() {
  const width = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleSearch("avengers");
  }, []);

  const handleSearch = (term = searchTerm) => {
    if (typeof term !== "string" || term.trim() === "") return;

    setLoading(true);

    fetch(`https://www.omdbapi.com/?s=${term}&apikey=5328cf5d`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          const formattedMovies = data.Search.map((movie) => ({
            id: movie.ID,
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
      {/* HERO */}
      <div className="hero">
        <div className="hero-content">
          <h1>Unlimited movies, series and more</h1>
          <p>Search your favorite movies instantly</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          {searchTerm
            ? `Results for: "${searchTerm}"`
            : "Trending Movies"}
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
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;