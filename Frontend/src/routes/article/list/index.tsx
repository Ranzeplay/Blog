import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { LuCalendar, LuLibrary, LuTag } from "@qwikest/icons/lucide";
import dayjs from "dayjs";
import { RootNavBar } from "~/components/navbar/root-navbar";
import { emptyArticle, type ArticleViewModel } from "~/libs/article";

export default component$(() => {
	const article = emptyArticle;
	article.title = "Demo";
	article.publishTime = new Date();
	article.category.name = "Default";
	article.tags = [
		{ name: "t1", slug: "t1", articleSlugs: [], postSlugs: [] },
		{ name: "t2", slug: "t2", articleSlugs: [], postSlugs: [] }
	];
	article.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

	return (
		<>
			<RootNavBar />
			<div class="mx-auto max-w-screen-md flex flex-col mt-12 gap-y-1.5">
				<div class="flex flex-row items-baseline justify-between">
					<h2 class="text-3xl text-black font-bold font-serif">Articles</h2>
					<p class="text-sm text-gray-500">Showing 2 entries</p>
				</div>
				<input title="Search" placeholder="Search" class="outline-none border-b p-1 border-gray-500 hover:border-black transition text-sm" />
				<div class="mt-6 flex flex-col gap-y-4">
					<ArticleEntry {...article} />
					<ArticleEntry {...article} />
				</div>
			</div>
		</>
	)
});

export const ArticleEntry = component$<ArticleViewModel>((props) => {
	return (
		<div class="border border-gray-400 rounded-lg p-4 flex flex-col gap-y-2">
			<h3 class="font-bold text-lg">
				<a class="hover:underline" href="#">{props.title}</a>
			</h3>
			<p class="text-xs font-thin">{props.content}</p>
			<div class="flex flex-row divide-x text-sm text-gray-500">
				<p class="pr-2 flex flex-row gap-x-1 items-center"><LuLibrary opacity={0.5} /> {props.category.name}</p>
				<div class="px-2 flex flex-row gap-x-1 text-xs items-center">
					<LuTag opacity={0.5} />
					{props.tags.map(a => (
						<p key={a.slug}>{a.name}</p>
					))}
				</div>
				<p class="px-2 flex flex-row gap-x-1 items-center text-xs"><LuCalendar opacity={0.5} /> {dayjs(props.publishTime).format('YYYY-MM-DD HH:mm')}</p>
			</div>
		</div>
	);
})

export const head: DocumentHead = {
	title: "Articles - Blog",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};
