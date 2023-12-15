import styles from './home.module.css';

export default function Home() {
  return (
    <div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>About Me</h2>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Latest Posts</h2>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Links</h2>
      </div>
    </div>
  )
}
