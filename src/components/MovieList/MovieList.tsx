import { Movie } from "../../types/movie.types";
import MovieItem from "./../MovieItem/MovieItem";
import styles from "./MovieList.module.css";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export default function MovieList({ movies, onMovieClick }: MovieListProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  )
}