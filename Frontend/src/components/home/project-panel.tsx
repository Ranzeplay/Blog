import { component$ } from "@builder.io/qwik";

export const HomeProjectPanel = component$(() => {
	return (
		<div class="bg-white w-full">
			<div class="min-h-screen flex flex-row justify-between mx-auto max-w-screen-lg">
				<div class="flex flex-col gap-y-8 self-center">
					<div class="w-96 h-24 bg-black"></div>
					<div class="w-96 h-24 bg-black"></div>
					<div class="w-96 h-24 bg-black"></div>
				</div>
				<div class="flex flex-col gap-y-1 self-center">
					<h1 class="text-3xl font-bold font-serif">Projects</h1>
					<h5 class="text-gray-500">2 active projects</h5>
				</div>
			</div>
		</div>
	);
});