import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { LuActivity, LuCalendar, LuCode, LuGithub, LuLibrary, LuTag, LuTent } from "@qwikest/icons/lucide";
import dayjs from "dayjs";
import { RootNavBar } from "~/components/navbar/root-navbar";
import { createEmptyProjectViewModel, type ProjectViewModel } from "~/libs/project";

export default component$(() => {
	const project = createEmptyProjectViewModel();
	project.name = "Demo";
	project.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl suscipit adipiscing bibendum est ultricies integer. Quis hendrerit dolor magna eget est.";

	return (
		<>
			<RootNavBar />
			<div class="mx-auto max-w-screen-md flex flex-col mt-12 gap-y-1">
				<div class="flex flex-row items-baseline justify-between">
					<h2 class="text-3xl text-black font-bold font-serif">Projects</h2>
					<p class="text-sm text-gray-500">Showing 2 entries</p>
				</div>
				<input title="Search" placeholder="Search" class="outline-none border-b rounded p-1 border-gray-500 hover:border-black transition" />
				<div class="mt-6 grid grid-cols-2 gap-4">
					<ProjectEntry {...project} />
					<ProjectEntry {...project} />
				</div>
			</div>
		</>
	)
});

export const ProjectEntry = component$<ProjectViewModel>((props) => {
	return (
		<div class="border border-gray-400 rounded-lg p-4 flex flex-col gap-y-2">
			<h3 class="font-bold text-lg flex flex-row gap-x-1.5">
				<span class="flex flex-row items-center gap-x-0.5 rounded-md bg-green-500/40 px-1.5 text-xs font-light text-green-900"><LuActivity font-size={12} /> Active</span>
				{props.name}
			</h3>
			<p class="text-xs font-thin">{props.description}</p>
			<div class="flex flex-row gap-x-2">
				<a class="flex flex-row gap-x-1 items-center text-xs text-blue-600 hover:underline transition" href="#">
					<LuCode /> Repo
				</a>
				<a class="flex flex-row gap-x-1 items-center text-xs text-blue-600 hover:underline transition" href="#">
					<LuTent /> Website
				</a>
			</div>
		</div>
	);
})

export const head: DocumentHead = {
	title: "Projects - Blog",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};
