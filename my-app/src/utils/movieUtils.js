export function upgradePosterImageUrl(url) {
  if (!url || typeof url !== "string") return url;
  return url
    .replace(/SX300/g, "SX1000")
    .replace(/SX342/g, "SX1000")
    .replace(/SX600/g, "SX1000");
}

export function upgradePoster(movie) {
  const poster = movie?.poster || movie?.Poster;
  if (poster && typeof poster === "string" && /SX(300|342|600)/.test(poster)) {
    return {
      ...movie,
      poster: upgradePosterImageUrl(poster),
      title: movie.title || movie.Title,
      id: movie.id || movie.imdbID,
    };
  }
  return {
    ...movie,
    title: movie.title || movie.Title,
    id: movie.id || movie.imdbID,
  };
}
