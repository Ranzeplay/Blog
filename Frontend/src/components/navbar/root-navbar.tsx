import { component$ } from "@builder.io/qwik";

interface Props {
	sticky?: boolean
}

export const RootNavBar = component$<Props>((props) => {
	return (
		<div class={`${props.sticky ? 'fixed' : 'absolute'} w-full items-center px-8 backdrop-blur-md bg-white/70 shadow-md`}>
			<div class="flex flex-row h-14 py-0 gap-x-4 text-sm">
				<button class="font-serif font-bold text-xl mr-4">Blog</button>
				<button>Home</button>
				<button>Articles</button>
				<button>Projects</button>
				<button>Posts</button>
				<button>Diaries</button>
			</div>
		</div>
	);
});