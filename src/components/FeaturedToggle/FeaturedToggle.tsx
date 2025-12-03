import styles from './FeaturedToggle.module.css';

interface FeaturedToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function FeaturedToggle({ enabled, onToggle }: FeaturedToggleProps) {
  return(
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
        className={styles.checkbox}
      />
      <span className={styles.slider}></span>
      <span className={styles.label}>
        <span className={styles.star}>⭐</span>
        Em destaque
      </span>
    </label>
  )
}