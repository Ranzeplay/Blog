import ManagementLayout from "../../layout";
import { Suspense, useEffect, useState } from "react";
import { ArticleViewModel } from "@/lib/blog/article";
import { useRouter } from 'next/router';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Index() {
	const router = useRouter();
	const { slug } = router.query;

	let emptyArticle: ArticleViewModel = {
		slug: '',
		title: '',
		publishTime: new Date(),
		lastModifiedTime: new Date(),
		category: {
			name: '', slug: '',
			articleSlugs: []
		},
		tags: [],
		content: ''
	};

	const [article, setArticle] = useState(emptyArticle);
	useEffect(() => {
		fetch('/api/article/entry/' + slug).then(async (response) => {
			response.json().then((data) => {
				console.log(data);
				setArticle(data);
			})
		});
	}, [slug]);

	return (
		<ManagementLayout title="Articles" description="Article entry">
			<Suspense>
				<div className="flex flex-col mt-4">
					<h3 className="font-semibold text-2xl">Metadata</h3>
					<Table>
						{/* <TableCaption>Data table</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Value</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>Slug</TableCell>
								<TableCell>{article?.slug}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>{article?.title}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Publish time (UTC)</TableCell>
								<TableCell>{new Date(article?.publishTime).toUTCString()}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Category</TableCell>
								<TableCell>
									<Link className="hover:underline" href={'/category/entry/' + article?.category?.slug}>{article?.category?.name}</Link>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Tags</TableCell>
								<TableCell className="flex flex-row gap-x-2">
									{article?.tags?.map(t => (
										<Badge variant={'outline'} className="font-medium hover:underline" key={t?.slug}>
											<Link href={'/tag/entry/' + t?.slug}>{t?.name}</Link>
										</Badge>
									))}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<div className="flex flex-col mt-4">
					<h3 className="font-semibold text-2xl">Raw content</h3>
					<Separator />
					<p className="mt-4 p-2 border-spacing-1 border">{article?.content}</p>
				</div>
			</Suspense>
		</ManagementLayout>
	)
}
