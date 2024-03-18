import { component$ } from "@builder.io/qwik";
import type { ArticleViewModel } from "~/libs/article";
import { LuClock, LuText } from "@qwikest/icons/lucide";
import dayjs from "dayjs";

interface Props {
	article: ArticleViewModel
}

export const ArticleCard = component$<Props>((props) => {
	return (
		<div class="p-3 block border-gray-400 border rounded-md bg-gradient-to-r from-slate-50 to-gray-300">
			<h4 class="flex flex-row gap-x-1 items-center">
				<LuText />
				<span>{props.article.title}</span>
			</h4>
			<div class="font-mono text-sm flex flex-row gap-x-1 items-center">
				<LuClock />
				<span>{dayjs(props.article.publishTime).format('YYYY-MM-DD HH:mm')}</span>
			</div>
		</div>
	);
});