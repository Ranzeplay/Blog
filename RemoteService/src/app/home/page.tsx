import { Metadata } from 'next';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'Home - Blog'
};

export default function Page() {
  return (
    <div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Pinned Page</h2>
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
