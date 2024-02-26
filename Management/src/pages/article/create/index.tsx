"use client";

import { PlateEditor } from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ManagementLayout from "@/pages/layout";
import { XCircle } from "lucide-react";

export default function Index() {
	return (
		<ManagementLayout title="Articles" description="Create new article">
			<div className="w-full flex flex-col gap-y-4">
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="email">Title</Label>
					<Input type="text" id="title" placeholder="Title"/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="slug">Slug</Label>
					<Input type="text" id="slug" placeholder="Slug" />
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label>Category</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">Select</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<Input type="text" id="category" placeholder="Search category" />
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Existing categories</DropdownMenuLabel>
							<DropdownMenuItem>Default</DropdownMenuItem>
							<DropdownMenuItem>Hidden</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>Create new category</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="tag">Tags</Label>
					<div className="flex flex-row gap-x-2">
						<Badge variant={'outline'} className="font-normal gap-x-2">Default <XCircle strokeWidth={1.5} fontWeight={"200"} size={16} cursor={"pointer"}></XCircle></Badge>
						<Input type="text" id="tag" placeholder="Tag" />
					</div>
				</div>
				<div className="w-full min-h-48">
					<Label>Content</Label>
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
