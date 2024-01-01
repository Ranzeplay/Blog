import { Metadata } from 'next';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'Home - Blog'
};

export default function Page() {
  return (
    <div className='grid grid-cols-3 gap-x-12'>
      <div className={`card col-span-2`}>
        <h2 className={styles.cardTitle}>Pinned Page</h2>
      </div>
      <div className={`card col-span-1`}>
        <h2 className={styles.cardTitle}>Hello</h2>
      </div>
      <div className={`card col-span-1`}>
        <h2 className={styles.cardTitle}>Links</h2>
      </div>
      <div className={`card col-span-2`}>
        <h2 className={styles.cardTitle}>Latest Posts</h2>
      </div>
    </div>
  )
}
