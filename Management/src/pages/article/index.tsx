"use client";

import { Button } from "@/components/ui/button";
import ManagementLayout from "../layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleViewModel } from "@/lib/blog/article";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Index() {
	const [articles, setArticles] = useState<ArticleViewModel[]>([]);
	useEffect(() => {
		fetch('/api/article/list').then(async (response) => {
			response.json().then((data) => {
				setArticles(data);
			})
		});
	}, []);

	return (
		<ManagementLayout title="Articles" description="Manage your articles">
			<div className="flex flex-col gap-y-2">
				<h3 className="font-semibold text-2xl">Operations</h3>
				<Button variant={'link'} className="flex w-min text-blue-500 hover:underline">
					<Link href={'/article/create'} className="flex">
						Create new article
					</Link>
				</Button>
			</div>
			<div className="flex flex-col mt-4">
				<h3 className="font-semibold text-2xl">List</h3>
				<Table>
					<TableCaption>Showing {articles.length} articles</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Slug</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Category</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{articles.map((article) => (
							<TableRow key={article.slug}>
								<TableCell className="font-medium">{article.slug}</TableCell>
								<TableCell>{article.title}</TableCell>
								<TableCell>{article.category.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</ManagementLayout>
	)
}
