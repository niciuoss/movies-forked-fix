import { Movie } from "../../types/movie.types";
import styles from "./MovieItem.module.css";

interface MovieItemProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";

export default function MovieItem({ movie, onClick }: MovieItemProps) {
  return (
    <div className={styles.movieItem} onClick={() => onClick(movie)}>
      <header className={styles.movieItemHeader}>
        <img
          className={styles.poster}
          src={assetsUrl + movie.poster_path}
          alt={movie.title}
          draggable={false}
          loading="lazy"
        />
        {movie.featured && (
          <span className={styles.badge}>Em destaque</span>
        )}
      </header>
      <div className={styles.info}>
        <h4 className={styles.title}>{movie.title}</h4>
        <div className={styles.rating}>
          <span className={styles.star}>⭐</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
