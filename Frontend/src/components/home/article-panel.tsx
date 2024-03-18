import { component$ } from "@builder.io/qwik";
import { emptyArticle } from "~/libs/article";
import { ArticleCard } from "../article/card";

export const HomeArticlePanel = component$(() => {
	const demoArticle = emptyArticle;
	demoArticle.title = "Article title";
	demoArticle.publishTime = new Date();

	return (
		<div class="bg-white w-full">
			<div class="min-h-screen flex flex-row justify-between mx-auto max-w-screen-lg">
				<div class="flex self-center flex-col gap-y-1">
					<h1 class="text-3xl font-bold font-serif">Latest articles</h1>
					<h5 class="text-gray-500">3 articles this month</h5>
				</div>
				<div class="flex flex-col gap-y-8 self-center">
					<ArticleCard article={demoArticle} />
					<div class="w-96 h-24 bg-black"></div>
					<div class="w-96 h-24 bg-black"></div>
				</div>
			</div>
		</div>
	);
});