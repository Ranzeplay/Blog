"use client";

import ManagementLayout from "../layout";
import { useEffect, useState } from "react";
import { CategoryViewModel } from "@/lib/blog/category";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import CreateCategoryComponent from "./createComp";
import { Button } from "@/components/ui/button";

export default function Index() {
	const [categories, setCategories] = useState<CategoryViewModel[]>([]);
	useEffect(() => {
		fetch('/api/category/list').then(async (response) => {
			response.json().then((data) => {
				setCategories(data);
			})
		});
	}, []);

	const [openCategoryOpenPanel, setOpenCategoryOpenPanel] = useState(false);

	return (
		<ManagementLayout title="Categories" description="Manage your categories">
			<div className="flex flex-col gap-y-2">
				<h3 className="font-semibold text-2xl">Operations</h3>
				<Button onClick={() => setOpenCategoryOpenPanel(true)} variant={'link'} className="w-min text-blue-500 hover:underline">Create new category</Button>
				<CreateCategoryComponent open={openCategoryOpenPanel} setOpen={setOpenCategoryOpenPanel} />
			</div>
			<div className="flex flex-col mt-4">
				<h3 className="font-semibold text-2xl">List</h3>
				<Table>
					<TableCaption>Showing {categories.length} categories</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Slug</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Items</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories.map((category) => (
							<TableRow key={category.slug}>
								<TableCell className="font-medium">{category.slug}</TableCell>
								<TableCell>{category.name}</TableCell>
								<TableCell>{category.articleSlugs.length}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</ManagementLayout>
	)
}
