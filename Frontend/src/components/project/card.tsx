import { component$ } from "@builder.io/qwik";
import { LuActivity, LuText } from "@qwikest/icons/lucide";
import type { ProjectViewModel } from "~/libs/project";

interface Props {
	project: ProjectViewModel
}

export const ProjectCard = component$<Props>((props) => {
	return (
		<div class="p-3 block border-gray-400 border rounded-md bg-gradient-to-l from-slate-50 to-gray-300">
			<h4 class="flex flex-row gap-x-1 items-center mb-1">
				<span>{props.project.name}</span>
			</h4>
			<h5 class="font-mono text-sm flex flex-row gap-x-1 items-center text-gray-600">
				<LuText />
				<span>{props.project.description}</span>
			</h5>
			<h5 class="font-mono text-sm flex flex-row gap-x-1 items-center text-gray-600">
				<LuActivity />
				<span>Active</span>
			</h5>
		</div>
	);
});