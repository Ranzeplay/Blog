import Link from 'next/link';
import styles from './nav.module.css';

export default function NavBarComponent() {
	return (
		<div className="blog-container">
		<nav className={styles.navbar}>
		  <div className={styles.navbarContainer}>
			<div className="container-fluid">
			  <Link href="/" className={styles.siteName}>Blog</Link>
	
			  <a className={styles.siteEntry}>Home</a>
			  <a className={styles.siteEntry}>Categories</a>
			  <a className={styles.siteEntry}>Articles</a>
			  <a className={styles.siteEntry}>Tags</a>
			  <a className={styles.siteEntry}>Pages</a>
			</div>
		  </div>
		</nav>
	  </div>
	);
}