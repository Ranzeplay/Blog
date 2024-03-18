import { component$ } from "@builder.io/qwik";

export const HomeLandingPanel = component$(() => {
	return (
		<div class="h-screen mx-auto max-w-screen-lg flex flex-col justify-center gap-y-4">
			<div class="flex flex-col gap-y-2 w-fit">
				<h1 class="text-3xl font-bold text-nowrap">Jeb Feng</h1>
				<h4 class="text-lg text-nowrap">仰观宇宙之大</h4>
			</div>
			<div class="flex flex-row gap-x-4 border-t-2 w-fit pt-4">
				<p>2 posts</p>
				<p>12 projects</p>
			</div>
		</div>
	);
})