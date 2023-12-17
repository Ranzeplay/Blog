import { Metadata } from "next";
import styles from "./read-article.module.css";
import React from "react";
import * as prod from 'react/jsx-runtime';
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const metadata: Metadata = {
	title: 'Read - Blog'
};

// @ts-expect-error: the react types are missing.
const production = {Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}

export default async function Page() {
	const content = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, production)
    .processSync(await fetchArticle()).result;

	return (
		<div className={`card`}>
			<h1 className="font-serif font-bold text-2xl">Hello</h1>

			<div className={styles.content}>
				{content}
			</div>
		</div>
	)
}

async function fetchArticle(): Promise<string> {
	const res = await fetch('http://localhost:3000/markdown-example.md');
	return res.text();
}
