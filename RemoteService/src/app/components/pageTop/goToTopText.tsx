'use client';

import styles from './goToTopText.module.css';

export default function ScrollToTopText() {
	return (
		<a onClick={scrollToTop} className={styles.operationLink}>Go to top</a>
	)
}

const scrollToTop = (() => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
