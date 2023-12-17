import { Metadata } from "next";
import styles from "./read-article.module.css";
import React from "react";
import * as prod from 'react/jsx-runtime';
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { readingTime } from 'reading-time-estimator'

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
		.use(remarkRehype)
		.use(rehypeReact, production)
		.processSync(articleMarkdown).result;

	return (
		<div className="card">
			<div className="m-6">
				<h1 className="font-serif font-bold text-4xl">Title</h1>
				<div className="font-mono font-light text-gray-500">
					<span>Publish time</span>
					<span className="mx-2">|</span>
					<span>{timeToRead.text}</span>
				</div>

				<div className={styles.content + " mt-12"}>
					{content}
				</div>
			</div>
		</div>
	)
}

async function fetchArticle(): Promise<string> {
	const res = await fetch('http://localhost:3000/markdown-example.md');
	return res.text();
}
