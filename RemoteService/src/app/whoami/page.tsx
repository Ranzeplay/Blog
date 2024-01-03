"use client";
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
// import localFont from 'next/font/local';
import styles from './whoami.module.css';

import 'mingcute_icon/font/Mingcute.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// const mingCuteIconFont = localFont({ src: 'node_modules/mingcute_icon/font/MingCute.woff' });

export default function Page() {
	return (
		<div className={styles.panel}>
			<title>Whoami - Blog</title>

			<img className={styles.backgroundImg + " w-full h-screen bg-black brightness-50"} src="https://ranzeplay.space/assets/about/background.png" alt="Background image" />

			<div className="backdrop-blur-sm">
				<div className="flex md:flex-row flex-col relative h-screen md:w-5/6">
					<div className="flex flex-col w-full content-between items-between relative my-auto">
						<img className="p-4 mx-auto w-2/5 aspect-auto rounded-full bg-white drop-shadow-xl outline-8 outline-gray-300" src="https://ranzeplay.space/assets/about/avatar.svg" alt="Jeb Feng's avatar" />
					</div>

					<div className="flex flex-col w-full content-between items-between relative my-auto">
						<div className="items-end md:mr-16 md:ml-5 mx-8">
							<h5 className="font-mono text-right text-white">$ whoami</h5>
							<h2 className="text-right text-6xl font-bold title-text text-white drop-shadow-md">Jeb Feng</h2>

							<div className="grid grid-cols-1 xl:grid-cols-2 text-center gap-1 mt-8 font-mono text-lg text-white">
								<div className={styles.myTag}>&lt;Developer /&gt;</div>
								<div className={styles.myTag}>&lt;Senior High /&gt;</div>
								<div className={styles.myTag}>&lt;INFP-T /&gt;</div>
								<div className={styles.myTag}>&lt;Gen Z /&gt;</div>
							</div>

							<div className="flex flex-row-reverse text-xl mt-2 justify-between xl:w-3/5 xl:ml-auto xl:mr-0">
								<span className={styles.clickableIconWrapper}>
									<Link className="drop-shadow-sm" href={'mailto:ranzeplay@outlook.com'}>
										<FontAwesomeIcon icon={faEnvelope} color='white' />
									</Link>
								</span>
								<span className={styles.clickableIconWrapper}>
									<Link className="drop-shadow-sm" target='blank' href={''}>
										<FontAwesomeIcon icon={faTelegram} color='white' />
									</Link>
								</span>
								<span className={styles.clickableIconWrapper}>
									<Link className="drop-shadow-sm" target='blank' href={'https://twitter.com/ranzeplay'}>
										<FontAwesomeIcon icon={faTwitter} color='white' />
									</Link>
								</span>
								<span className={styles.clickableIconWrapper}>
									<Link className="drop-shadow-sm text-white" target='blank' href={'https://github.com/Ranzeplay'}>
										<FontAwesomeIcon icon={faGithub} color='white' />
									</Link>
								</span>
								<span className={styles.clickableIconWrapper}>
									<Link className='drop-shadow-sm text-white pt-2' target='blank' href={'https://space.bilibili.com/102116986'}>
										<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24">
											<path fill="currentColor" d="M7.172 2.757L10.414 6h3.171l3.243-3.242a1 1 0 1 1 1.415 1.414L16.414 6H18.5A3.5 3.5 0 0 1 22 9.5v8a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 2 17.5v-8A3.5 3.5 0 0 1 5.5 6h2.085L5.757 4.171a1 1 0 0 1 1.415-1.414ZM18.5 8h-13a1.5 1.5 0 0 0-1.493 1.355L4 9.5v8a1.5 1.5 0 0 0 1.356 1.493L5.5 19h13a1.5 1.5 0 0 0 1.493-1.356L20 17.5v-8A1.5 1.5 0 0 0 18.5 8ZM8 11a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z"></path>
										</svg>
									</Link>
								</span>

							</div>

							<div className="text-right mt-2 text-lg force-white">
								<Link href="/home" className={styles.hoverUnderlineAnimation}>Continue <i className='mgc_arrow_right_line ml-1'></i></Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
