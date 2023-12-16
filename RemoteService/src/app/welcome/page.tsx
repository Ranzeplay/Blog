import styles from './welcome.module.css';

export default function About() {
	return (
		<div className={styles.panel}>
			<img className={styles.backgroundImg + " w-full h-screen bg-black brightness-50"} src="/assets/about/background.png" alt="Background image"/>

			<div className="backdrop-blur-sm">
				<div className="flex relative h-screen w-5/6">
					<div className="flex flex-col w-full content-between items-between relative my-auto">
						<img className="p-4 mx-auto w-2/5 aspect-auto rounded-full bg-white drop-shadow-xl outline-8 outline-gray-300" src="/assets/about/avatar.svg" alt="Jeb Feng's avatar" />
					</div>

					<div className="flex flex-col w-full content-between items-between relative my-auto">
						<div className="items-end mr-16 ml-5">
							<h2 className="text-right text-6xl font-bold title-text text-white">Jeb Feng</h2>

							<div className="grid grid-cols-2 text-center gap-2 mt-8 font-mono ml-12 text-lg">
								<div className={styles.myTag}>&lt;Developer /&gt;</div>
								<div className={styles.myTag}>&lt;Senior High /&gt;</div>
								<div className={styles.myTag}>&lt;INFP-T /&gt;</div>
								<div className={styles.myTag}>&lt;Gen Z /&gt;</div>
							</div>

							<div className="text-right mt-6 text-lg text-white">
								<a className={styles.hoverUnderlineAnimation}>Continue</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
