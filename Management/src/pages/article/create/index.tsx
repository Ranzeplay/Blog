import { PlateEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import ManagementLayout from "@/pages/layout";

export default function Index() {
	return (
		<ManagementLayout title="Articles" description="Create new article">
			<div className="w-full flex flex-col gap-y-4">
				<div className="w-full min-h-48">
					<PlateEditor />
				</div>
				<div className="flex flex-row gap-x-2">
					<Button>Publish</Button>
					<Button variant={'outline'}>Draft</Button>
					<Button variant={'ghost'}>Cancel</Button>
				</div>
			</div>
		</ManagementLayout>
	)
}
