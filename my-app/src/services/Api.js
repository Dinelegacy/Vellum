const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "5328cf5d";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (term) => {
    if (!API_KEY) {
        console.error("API Key is missing!");
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}?s=${term}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Search) {
            // Removes duplicates based on imdbID
            const uniqueMovies = data.Search.filter(
                (movie, index, self) =>
                    index === self.findIndex((m) => m.imdbID === movie.imdbID)
            );

            // Returns the formatted array your UI expects
            return uniqueMovies.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster !== "N/A" ? movie.Poster : "https://placeholder.com"
            }));
        }
        return [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};