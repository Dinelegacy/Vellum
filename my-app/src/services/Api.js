const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

// ✅ Debug (remove later)
console.log("API KEY:", API_KEY);

export const searchMovies = async (query) => {
    try {
        if (!API_KEY) {
            throw new Error("Missing API key. Check your .env file.");
        }

        const response = await fetch(
            `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
        );

        const data = await response.json();

        if (data.Response === "True") {
            return data.Search.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster !== "N/A" ? movie.Poster : null,
                type: movie.Type,
            }));
        }

        console.warn("No results:", data.Error);
        return [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export const getMovieDetails = async (id) => {
    try {
        if (!API_KEY) {
            throw new Error("Missing API key. Check your .env file.");
        }

        const response = await fetch(
            `${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`
        );

        const data = await response.json();

        if (data.Response === "True") {
            return {
                id: data.imdbID,
                title: data.Title,
                year: data.Year,
                poster: data.Poster !== "N/A" ? data.Poster : null,
                plot: data.Plot,
                rating: data.imdbRating,
                director: data.Director,
                actors: data.Actors,
                genre: data.Genre,
            };
        }

        console.warn("No details:", data.Error);
        return null;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};