import { useEffect } from "react";
import { Movie, Genre } from "../../types/movie.types";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie | null;
  genres: Genre[];
  onClose: () => void;
}

const BACKDROP_URL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
const POSTER_URL = "https://www.themoviedb.org/t/p/w500/";

export default function MovieModal({ movie, genres, onClose }: MovieModalProps) {
  useEffect(() => {
    if (movie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [movie]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    if (!movie) return null;

    const movieGenres = genres.filter((genre) => movie.genre_ids.includes(genre.id));
    const releaseYear = new Date(movie.release_date).getFullYear();

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">x</button>
          <div
            className={styles.backdrop}
            style={{ backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})` }}
          >
            <div className={styles.backdropOverlay}></div>
        </div>

      <div className={styles.content}>
        <div className={styles.posterSelection}>
          <img
            src={`${POSTER_URL}${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.title}>{movie.title}</h2>
            {movie.featured && (
              <span className={styles.badge}>⭐ Em destaque</span>
            )}
          </div>

          <div className={styles.metadata}>
            <span className={styles.year}>{releaseYear}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.rating}>
              <span className={styles.star}>⭐</span>
              {movie.vote_average.toFixed(1)} / 10
            </span>
            <span className={styles.separator}>•</span>
            <span className={styles.votes}>{movie?.vote_count.toLocaleString('pt-BR')} votos</span>
          </div>

          {movieGenres.length > 0 && (
            <div className={styles.genres}>
              {movieGenres.map((genre) => (
                <span key={genre.id} className={styles.genreTag}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className={styles.overview}>
            <h3 className={styles.overviewTitle}>Sinopse</h3>
            <p className={styles.overviewText}>{movie.overview}</p>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Título Original:</span>
              <span className={styles.detailValue}>{movie.original_title}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Idioma Original:</span>
              <span className={styles.detailValue}>{movie.original_language.toUpperCase()}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Data de Lançamento:</span> 
              <span className={styles.detailValue}>
                {new Date(movie.release_date).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Popularidade:</span>
              <span className={styles.detailValue}>{movie.popularity.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
  );
}
