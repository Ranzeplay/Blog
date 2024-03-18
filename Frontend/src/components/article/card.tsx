import { component$ } from "@builder.io/qwik";
import type { ArticleViewModel } from "~/libs/article";
import { LuCalendar, LuLibrary } from "@qwikest/icons/lucide";
import dayjs from "dayjs";

interface Props {
	article: ArticleViewModel
}

export const ArticleCard = component$<Props>((props) => {
	return (
		<div class="p-3 block border-gray-400 border rounded-md bg-gradient-to-r from-slate-50 to-gray-300">
			<h4 class="flex flex-row gap-x-1 items-center mb-1">
				<span>{props.article.title}</span>
			</h4>
			<h5 class="font-mono text-sm flex flex-row gap-x-1 items-center text-gray-600">
				<LuCalendar opacity={0.5} />
				<span>{dayjs(props.article.publishTime).format('YYYY-MM-DD HH:mm')}</span>
			</h5>
			<h5 class="text-sm flex flex-row gap-x-1 items-center text-gray-600">
				<LuLibrary  opacity={0.5} />
				<span>{props.article.category.name}</span>
			</h5>
		</div>
	);
});