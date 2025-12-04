import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎬</span>
          <h1 className={styles.logoText}>Movie Match</h1>
        </div>
        <p className={styles.subtitle}>Descubra qual fime dará match com você ❤️🎥</p>
      </div>
    </header>
  )
}