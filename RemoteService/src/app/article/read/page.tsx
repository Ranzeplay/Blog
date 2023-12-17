import { Metadata } from "next";
import styles from "./read-article.module.css";
import React from "react";
import * as prod from 'react/jsx-runtime';
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import { unified } from "unified";
import { readingTime } from 'reading-time-estimator'
import rehypeKatex from "rehype-katex";

export const metadata: Metadata = {
	title: 'Read - Blog'
};

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

export default async function Page() {
	const articleMarkdown = await fetchArticle();
	const timeToRead = readingTime(articleMarkdown);

	const content = unified()
		.use(remarkParse)
		.use(remarkMath)
		.use(remarkRehype)
		.use(rehypeKatex)
		.use(rehypeReact, production)
		.processSync(articleMarkdown).result;

	return (
		<div>
			<div className="block backdrop-filter backdrop-blur-md fixed top-0 w-full bg-white/30 h-16 shadow-lg z-10 px-24 content-center py-auto">
				<div className="flex put-center">
					<img className="p-2 rounded-full bg-white drop-shadow-xl outline-2 outline-gray-300 h-4/5" src="https://ranzeplay.me/assets/about/avatar.svg" alt="Jeb Feng's avatar" />
					<div className="block ml-4 mt-1">
						<h5 className="text-xs text-gray-600">Article ID</h5>
						<h3 className="text-xl font-bold">Article title</h3>
					</div>
				</div>
			</div>
			<div className="pt-24 bg-white grid grid-cols-5 gap-1 w-full py-8 text-left">
				<div className="col-span-4">
					<div className="w-2/3 mx-auto">
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
					<div className="fixed mt-4">
						<h3 className="text-xl font-serif">Topic of contents</h3>
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
