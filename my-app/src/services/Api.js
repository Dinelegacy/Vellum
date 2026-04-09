import { upgradePoster } from "../utils/movieUtils";

// REVIEW: The API key is bundled into the client-side JavaScript. Anyone can
// open DevTools → Network and read it. For a free-tier OMDB key the risk is
// low, but for paid APIs this would be a security issue. Consider proxying
// requests through a backend endpoint that keeps the key server-side.
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (term) => {
  if (!API_KEY) {
    console.error("API Key is missing!");
    return [];
  }

  try {
    // REVIEW: The search term is interpolated directly into the URL without
    // encodeURIComponent(). Titles containing &, #, or spaces will produce
    // a malformed URL or silently alter query params. Use:
    //   `${BASE_URL}?s=${encodeURIComponent(term)}&apikey=${API_KEY}`
    const response = await fetch(`${BASE_URL}?s=${term}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Search) {
      const uniqueMovies = data.Search.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.imdbID === movie.imdbID),
      );

      return uniqueMovies.map((movie) =>
        upgradePoster({
          id: movie.imdbID,
          title: movie.Title,
          poster:
            movie.Poster !== "N/A"
              ? movie.Poster
              : // REVIEW: via.placeholder.com is a different service
                // from placehold.co used everywhere else. It's also
                // less reliable and has been down in the past. Use
                // placehold.co consistently across the codebase.
                "https://via.placeholder.com/300x450?text=No+Image",
        }),
      );
    }
    return [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

// REVIEW: No fetch timeout — if the OMDb API hangs, the MoviePopup loading
// spinner will spin indefinitely with no way for the user to recover.
// Consider using AbortController with a timeout (e.g. 8 seconds).
export const getMovieDetails = async (id) => {
  if (!API_KEY) return null;

  try {
    const response = await fetch(
      `${BASE_URL}?i=${id}&apikey=${API_KEY}&plot=full`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Detail Fetch error:", error);
    return null;
  }
};
