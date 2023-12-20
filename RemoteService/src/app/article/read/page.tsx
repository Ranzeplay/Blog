"use client";

import styles from "./read-article.module.css";
import React from "react";
import * as prod from 'react/jsx-runtime';
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism";
import { unified } from "unified";
import { readingTime } from 'reading-time-estimator'
import rehypeKatex from "rehype-katex";

// Prism theme
import 'prismjs/themes/prism-okaidia.css';
// Prism plugins
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
// Prism languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-java';

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

export default async function Page() {
	const articleMarkdown = await fetchArticle();
	const timeToRead = readingTime(articleMarkdown);

	const content = (await unified()
		.use(remarkParse)
		.use(remarkMath)
		.use(remarkRehype)
		.use(rehypePrism, { plugins: ["line-numbers", 'copy-to-clipboard'] })
		.use(rehypeKatex)
		.use(rehypeReact, production)
		.process(articleMarkdown)).result;

	return (
		<div className="bg-white">
			<title>Read - Blog</title>
			<div className="backdrop-filter backdrop-blur-md fixed top-0 w-full bg-white/60 h-16 shadow-lg z-10 content-center py-auto">
				<div className="w-full put-center mx-14">
					<div className="flex my-auto h-full w-full">
						<img className="flex p-2 rounded-full bg-white drop-shadow-xl outline-2 outline-gray-300 h-4/5" src="https://ranzeplay.me/assets/about/avatar.svg" alt="Jeb Feng's avatar" />
						<div className="flex ml-4 flex-grow">
							<div className="block mt-1">
								<h5 className="text-xs text-gray-600 font-mono">Article ID</h5>
								<h3 className="text-xl font-bold">Article title</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pt-24 grid grid-cols-5 gap-12 w-3/4 mx-auto py-8 text-left">
				<div className="col-span-4">
					<div className="mx-auto">
						<h1 className="font-serif font-bold text-4xl mb-2">Title</h1>
						<div className="font-mono font-light text-gray-500">
							<span>Publish time</span>
							<span className="mx-2">|</span>
							<span>{timeToRead.text}</span>
						</div>

						<div className={styles.content + " mt-8"}>
							{content}
						</div>

						<div>
							<p className="mt-8 text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
								&copy; 2023 <a href="https://ranzeplay.me/" className="hover:underline" target="_blank" rel="noopener">Jeb Feng</a>. All rights reserved.
							</p>
						</div>
					</div>
				</div>
				<div className="col-span-1">
					<div className="fixed grid mt-4 gap-6">
						<div className="grid-row">
							<h3 className="text-xl font-serif">Operations</h3>
							<div className="grid mt-1">
								<a className={styles.operationLink}>Back</a>
								<a onClick={scrollToTop} className={styles.operationLink}>Go to top</a>
							</div>
						</div>
						<div className="grid-row">
							<h3 className="text-xl font-serif">Topic of contents</h3>
						</div>
						<div className="grid-row">
							<h3 className="text-xl font-serif">View these articles also</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

async function fetchArticle(): Promise<string> {
	const res = await fetch('http://localhost:3000/markdown-example.md');
	return res.text();
}

const scrollToTop = (() => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
