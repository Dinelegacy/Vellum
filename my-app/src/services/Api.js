const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "5328cf5d";
const BASE_URL = "https://www.omdbapi.com/";

// Existing search function
export const searchMovies = async (term) => {
    if (!API_KEY) {
        console.error("API Key is missing!");
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}?s=${term}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Search) {
            const uniqueMovies = data.Search.filter(
                (movie, index, self) =>
                    index === self.findIndex((m) => m.imdbID === movie.imdbID)
            );

            return uniqueMovies.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"
            }));
        }
        return [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export const getMovieDetails = async (id) => {
    if (!API_KEY) return null;

    try {
        // Note: we use 'i=' for ID and 'plot=full' for the long description
        const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}&plot=full`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Detail Fetch error:", error);
        return null;
    }
};