import { ChangeEvent } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder="Buscar filmes..."}: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <svg
      className={styles.searchIcon}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      >
        <path 
          d="M9 17a8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={() => onChange("")}
          aria-label="Limpar busca"
          >
            x
          </button>
      )}
    </div>
  );
}