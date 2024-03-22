import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

interface NavBarProps {
	sticky?: boolean,
}

export const RootNavBar = component$<NavBarProps>((props) => {
	return (
		<div class={`${props.sticky ? 'fixed' : ''} w-full items-center px-8 backdrop-blur-md bg-white/70 shadow-md`}>
			<div class="flex flex-row py-0 gap-x-4 text-sm h-14">
				<NavLink pathRoot="" href="/" caption="Blog" class="font-serif font-bold text-xl mr-4 -translate-y-0.5" />
				<NavLink pathRoot="/article" href="/article" caption="Articles" underline />
				<NavLink pathRoot="/project" href="/project" caption="Projects" underline />
				<NavLink pathRoot="/post" href="#" caption="Posts" underline />
				<NavLink pathRoot="/diary" href="#" caption="Diaries" underline />
			</div>
		</div>
	);
});

interface NavLinkProps {
	href: string;
	caption: string;
	underline?: boolean;
	class?: string;
	pathRoot: string;
}

export const NavLink = component$<NavLinkProps>((props) => {
	const location = useLocation();

	return (
		<a href={props.href} class={`${props.underline ? 'hover-underline-animation hover:text-black transition' : ''} flex items-center ${matchPath(location.url.pathname, props.pathRoot) ? 'text-black' : 'text-gray-500'}`}>
			<button type="button" class={props.class}>
				{props.caption}
			</button>
		</a>
	);
});

function matchPath(path: string, expected: string): boolean {
	return path.startsWith(expected);
}
