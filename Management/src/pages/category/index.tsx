"use client";

import { Button } from "@/components/ui/button";
import ManagementLayout from "../layout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
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

export default function Index() {
	const [categories, setCategories] = useState<CategoryViewModel[]>([]);
	useEffect(() => {
		fetch('/api/category/list').then(async (response) => {
			response.json().then((data) => {
				setCategories(data);
			})
		});
	}, []);

	return (
		<ManagementLayout title="Categories" description="Manage your categories">
			<div className="flex flex-col gap-y-2">
				<h3 className="font-semibold text-2xl">Operations</h3>
				<CreateCategoryDialog />
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

function CreateCategoryDialog() {
	"use client";
	const [open, setOpen] = useState(false);

	const formSchema = z.object({
		name: z.string().min(1),
		slug: z.string().min(1)
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			slug: ""
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await fetch('/api/category/create', {
				method: 'POST',
				body: JSON.stringify(values)
			});
			const data = await response.json();
			if (response.ok) {
				toast("Category created successfully");
				setOpen(false);
				return true;
			} else {
				toast(data.message || "Failed to create category");
				return false;
			}
		} catch (error) {
			toast("Failed to create category");
			console.error(error);
			return false;
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={'link'} className="flex w-min text-blue-500 hover:underline">Create new category</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new category</DialogTitle>
					<DialogDescription>
						Create new category with a name and a slug
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button type="submit">Submit</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
