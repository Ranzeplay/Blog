import { Button } from "@/components/ui/button";
import ManagementLayout from "../layout";
import Link from "next/link";

export default function Index() {
	return (
		<ManagementLayout title="Articles" description="Manage your articles">
			<div className="flex flex-col gap-y-2">
				<h3 className="font-semibold text-2xl">Operations</h3>
				<Button variant={'link'} className="flex">
					<Link href={'/article/create'} className="flex">
						Create new article
					</Link>
				</Button>
			</div>
			<div className="flex flex-row mt-4">
				<h3 className="font-semibold text-2xl">List</h3>
			</div>
		</ManagementLayout>
	)
}
