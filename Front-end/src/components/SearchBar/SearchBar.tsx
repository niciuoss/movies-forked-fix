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
        xmlns="http://www.w3.org/2000/svg"
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
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