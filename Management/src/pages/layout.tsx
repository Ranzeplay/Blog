import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ManagementLayout({
	children,
	title,
	description
}: {
	children: React.ReactNode,
	title: string,
	description?: string
}) {
	return (
		<main className="min-h-screen flex flex-row space-y-5 divide-x">
			<aside className="flex flex-col gap-y-4 min-w-56 pt-8 pl-4 pr-8 shadow-md  h-screen sticky top-0">
				<h3 className="px-4 font-light text-xl">Blog <span className="font-bold">Management</span></h3>

				<hr className="h-px bg-gray-200 border-0" />

				<div className="flex flex-col space-between h-full">
					<div className="flex flex-col grow">
						<NavEntry title='Overview' href='/overview' />
						<NavEntry title='Article' href='/article' />
						<NavEntry title='Post' href='/post' />
						<NavEntry title='Diary' href='/diary' />
						<NavEntry title='Category' href='/category' />
						<NavEntry title='Tag' href='/tag' />
						<NavEntry title='Project' href='/project' />
						<NavEntry title='File' href='/file' />
						<NavEntry title='Comment' href='/comment' />
						<NavEntry title='Metrics' href='/metrics' />
					</div>
					<div className="flex flex-col mb-3 w-full">
						<NavEntry title="Leave" href="/" />
					</div>
				</div>

			</aside>
			<div className="flex flex-row pl-12 pr-8 pt-4 flex-grow pb-6">
				<div className="flex flex-col w-full">
					<h1 className="font-semibold text-2xl">{title}</h1>
					{description !== "" ? <p className="text-gray-500 font-light">{description}</p> : <></>}

					<Separator className="my-4" />

					<div className="block">
						{children}
					</div>
				</div>
			</div>
		</main>
	)
}

function NavEntry(props: {title: string, href: string}) {
	return (
		<Link href={props.href} className="w-full px-2 text-left rounded-md py-2 pl-4 hover:bg-accent transition font-medium">
			{props.title}
		</Link>
	)
}