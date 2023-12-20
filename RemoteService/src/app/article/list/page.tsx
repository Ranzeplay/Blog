import { Metadata } from "next";
import React from "react";
import { ArticleOverviewViewModel } from "./articleOverviewViewModel";

export const metadata: Metadata = {
	title: 'Articles - Blog'
};

const articles: ArticleOverviewViewModel[] = [
	new ArticleOverviewViewModel('a1', 'Lorem ipsum', 'hello, world', new Date(), "demo", ["t1"]),
	new ArticleOverviewViewModel('a2', 'Some title', 'some description', new Date(), "demo2", ["t1", "t2", "t3"]),
	new ArticleOverviewViewModel('a3', '2023 a3', 'aa2', new Date(), "demo", ["t2"]),
]

export default function Page() {
	return (
		<div className="card">
			<h2 className="font-serif text-2xl">Articles</h2>
			<h5 className="text-gray-500">{articles.length} article(s) in total</h5>

			<div className="mt-8 divide-y-2 w-4/5 mx-auto">
				{articles.map(article => {
					return (
						<div className="py-2 w-full">
							<h3 className="text-2xl font-semibold hover:underline hover:cursor-pointer">{article.title}</h3>
							<p className="text-sm text-gray-400 font-mono">{article.publishTime.toLocaleString()}</p>
							<p className="mx-2 mt-2 text-gray-700 truncate">{article.shortContent}</p>
							<div className="flex flex-row gap-2 text-sm mt-2 divide-x-2">
								<p className="text-gray-500">{article.categoryName}</p>
								<div className="px-2 flex flex-row gap-2">
									{article.tags.map(tag => <p className="text-gray-400">{tag}</p>)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
