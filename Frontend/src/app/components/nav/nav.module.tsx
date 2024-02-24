'use client';

import Link from 'next/link';
import styles from './nav.module.css';

export default function NavBarComponent() {
	return (
		<div className="blog-container">
		<nav className={styles.navbar}>
		  <div className={styles.navbarContainer}>
			<div className="container-fluid">
			  <Link href="/" className={styles.siteName}>Blog</Link>
	
			  <Link href="/home" className={styles.siteEntry}>Home</Link>
			  <a href='/browse' className={styles.siteEntry}>Articles</a>
			  <a href='/projects' className={styles.siteEntry}>Projects</a>
			  <a className={styles.siteEntry}>Pages</a>
			</div>
		  </div>
		</nav>
	  </div>
	);
}
