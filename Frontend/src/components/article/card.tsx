import { component$ } from "@builder.io/qwik";
import type { ArticleViewModel } from "~/libs/article";

interface Props {
	article: ArticleViewModel
}

export const ArticleCard = component$<Props>((props) => {
	return (
		<div class="p-3 block border-gray-400 border rounded-md bg-gradient-to-r from-slate-50 to-gray-300">
			<h4>{props.article.title}</h4>
			<p class="font-mono text-sm">{new Date(props.article.publishTime).toUTCString()}</p>
		</div>
	);
});