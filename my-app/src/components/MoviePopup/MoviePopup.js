import { useState, useEffect, useMemo } from "react";
import { getMovieDetails } from "../../services/Api";
import { upgradePosterImageUrl } from "../../utils/movieUtils";

// REVIEW: This modal does not trap keyboard focus. When the dialog is open,
// pressing Tab lets the user focus elements behind the backdrop (navbar, cards,
// footer). This is a WCAG 2.1 failure (Success Criterion 2.4.3 — Focus Order).
// Implement a focus trap (e.g. react-focus-lock or manual first/last sentinel).
function MoviePopup({ movie, onClose, onDelete, onUpdate }) {
  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(movie.title || "");

  useEffect(() => {
    setNewTitle(movie.title || movie.Title || "");
    setIsEditing(false);
    setDetails(null);
  }, [movie]);

  // REVIEW: The dependency array is [movie], but movie is an object. If the
  // parent creates a new object reference on every render (e.g. inline object
  // or spread), this effect will re-fetch on every render, hammering the API.
  // Compare by movie.imdbID or movie.id instead.
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getMovieDetails(movie.imdbID || movie.id);
      if (!data || data.Response === "False") {
        setDetails({
          Title: movie.title || movie.Title,
          Year: "—",
          Rated: "—",
          Runtime: "—",
          Plot: "Details are not available for this title.",
          Poster: movie.poster || movie.Poster,
        });
        return;
      }
      setDetails({
        ...data,
        Title: movie.title || data.Title,
      });
    };
    if (movie) fetchInfo();
  }, [movie]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (isEditing) {
        setIsEditing(false);
        setNewTitle(movie.title || details?.Title || "");
        return;
      }
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isEditing, onClose, movie, details]);

  const handleSave = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const movieId = movie.imdbID || movie.id;
    onUpdate(movieId, trimmed);
    if (details) setDetails((prev) => ({ ...prev, Title: trimmed }));
    setNewTitle(trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const posterSrc = useMemo(() => {
    if (!details) return "";
    const fromDetails =
      details.Poster && details.Poster !== "N/A" ? details.Poster : null;
    const fromMovie = movie.poster || movie.Poster;
    const raw = fromDetails || fromMovie;
    if (!raw) {
      const t = encodeURIComponent(movie.title || movie.Title || "Movie");
      return `https://placehold.co/780x1170/141414/e5e5e5?text=${t}`;
    }
    return upgradePosterImageUrl(raw);
  }, [details, movie]);

  if (!details)
    return (
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-busy="true"
        aria-label="Loading movie details"
      >
        <div className="loader">Loading…</div>
      </div>
    );

  return (
    <div
      className="modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-popup-title"
    >
      <div
        className="modal-content netflix-style"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="close-x"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="modal-header-image">
          <img
            src={posterSrc}
            alt={details.Title || newTitle}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="modal-header-gradient" aria-hidden="true" />
        </div>

        <div className="modal-body">
          {isEditing ? (
            // REVIEW: Missing aria-label on edit input — screen readers
            // will announce it as an unlabelled text field. Add
            // aria-label="Edit movie title".
            // Also: autoFocus can disorient screen reader users because
            // it moves focus without announcement. Consider managing focus
            // programmatically with a ref and useEffect instead.
            <input
              id="movie-popup-title"
              className="modal-edit-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <h2 id="movie-popup-title" className="movie-title-large">
              {details.Title}
            </h2>
          )}

          <div className="movie-metadata">
            <span>{details.Year}</span>
            <span className="age-tag">{details.Rated}</span>
            <span>{details.Runtime}</span>
          </div>

          <p className="movie-description">{details.Plot}</p>

          <div className="modal-buttons">
            {isEditing ? (
              <>
                <button type="button" className="btn-save" onClick={handleSave}>
                  Save
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setIsEditing(false);
                    setNewTitle(movie.title || details?.Title || "");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn-edit-trigger"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Title
                </button>
                {/* REVIEW: window.confirm() is not accessible — it
                                    can't be styled, blocks the main thread, and some
                                    screen readers handle it inconsistently. Replace with
                                    a custom confirmation dialog for a consistent UX. */}
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => {
                    if (
                      window.confirm("Remove this title from your watchlist?")
                    ) {
                      onDelete(movie.imdbID || movie.id);
                    }
                  }}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePopup;
