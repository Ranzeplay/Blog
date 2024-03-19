import { component$ } from "@builder.io/qwik";

interface NavBarProps {
	sticky?: boolean,
}

export const RootNavBar = component$<NavBarProps>((props) => {
	return (
		<div class={`${props.sticky ? 'fixed' : ''} w-full items-center px-8 backdrop-blur-md bg-white/70 shadow-md`}>
			<div class="flex flex-row py-0 gap-x-4 text-sm h-14">
				<NavLink href="/" caption="Blog" class="font-serif font-bold text-xl mr-4 -translate-y-0.5" />
				<NavLink href="/article" caption="Articles" underline />
				<NavLink href="/project" caption="Projects" underline />
				<NavLink href="#" caption="Posts" underline />
				<NavLink href="#" caption="Diaries" underline />
			</div>
		</div>
	);
});

interface NavLinkProps {
	href: string;
	caption: string;
	underline?: boolean;
	class?: string;
}

export const NavLink = component$<NavLinkProps>((props) => {
	return (
		<a href={props.href} class={`${props.underline ? 'hover-underline-animation text-gray-500 hover:text-black transition' : ''} flex items-center`}>
			<button type="button" class={props.class}>
				{props.caption}
			</button>
		</a>
	);
});
