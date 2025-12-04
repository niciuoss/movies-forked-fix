import { Genre } from "../../types/movie.types";
import styles from "./CategoryFilter.module.css";

interface CategoryFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
  availableGenreIds: Set<number>;
}

export default function CategoryFilter({
  genres,
  selectedGenre,
  onSelectGenre,
  availableGenreIds,
}: CategoryFilterProps) {
  
  const avibleGenres = genres.filter(genre => availableGenreIds.has(genre.id));

  return (
    <div className={styles.categoryFilter}>
      <button
        className={`${styles.categoryButton} ${selectedGenre === null ? styles.selected : ''}`}
        onClick={() => onSelectGenre(null)}
      >Todos</button>
      {avibleGenres.map(genre => (
        <button
          key={genre.id}
          className={`${styles.categoryButton} ${selectedGenre === genre.id ? styles.selected : ''}`}
          onClick={() => onSelectGenre(genre.id)}
        >{genre.name}</button>
      ))}
    </div>
  )
}