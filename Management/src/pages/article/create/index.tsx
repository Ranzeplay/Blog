"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ManagementLayout from "@/pages/layout";
import { XCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { toast } from "sonner";
import { CategoryViewModel } from "@/lib/blog/category";
import { CreateArticleViewModel } from "@/lib/blog/article";
import CreateCategoryComponent from "@/pages/category/createComp";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Index() {
	const [content, setContent] = useState('Start typing from here...');
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [category, setCategory] = useState('');
	const [tags, setTags] = useState([] as string[]);
	
	const [tagCreationDialogOpen, setTagCreationDialogOpen] = useState(false);
	
	const [existingCategories, setExistingCategories] = useState<CategoryViewModel[]>([]);
	useEffect(() => {
		fetch('/api/category/list').then(async (response) => {
			response.json().then((data) => {
				setExistingCategories(data);
			})
		});
	}, []);

	const [currentSelectedCategoryName, setCurrentSelectedCategoryName] = useState('Select here');

	const [openCreateCategoryPanel, setOpenCreateCategoryPanel] = useState(false);

	function publish() {
		const article: CreateArticleViewModel = {
			title,
			slug,
			categorySlug: category,
			tagSlugs: tags,
			content
		};
		fetch('/api/article/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(article)
		}).then(async (response) => {
			if (response.status === 201) {
				toast.success('Article created successfully');
			} else {
				toast.error('Failed to create article');
			}
		});
	}

	return (
		<ManagementLayout title="Articles" description="Create new article">
			<div className="w-full flex flex-col gap-y-4">
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="email">Title</Label>
					<Input type="text" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="slug">Slug</Label>
					<Input type="text" id="slug" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label>Category</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">{currentSelectedCategoryName}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<Input type="text" id="category" placeholder="Search category" />
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Existing categories</DropdownMenuLabel>
							{existingCategories.map((category) => (
								<DropdownMenuItem
									key={category.slug}
									onClick={() => {
										setCategory(category.slug);
										setCurrentSelectedCategoryName(category.name)
									}}>
									{category.name}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => {setOpenCreateCategoryPanel(true)}}>
								<span>Create new</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<CreateCategoryComponent open={openCreateCategoryPanel} setOpen={setOpenCreateCategoryPanel} />
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="tag">Tags</Label>
					<div className="flex flex-col gap-y-2">
						{tags.length > 0 && (
							<div className="flex flex-row gap-x-2 h-8">
								{tags.map((tag, index) => (
									<Badge key={index} variant={'outline'} className="font-normal gap-x-2">
										<span>{tag}</span>
										<XCircle
											className="cursor-pointer text-gray-400 hover:text-gray-700 transition"
											strokeWidth={1.5}
											fontWeight={"200"}
											size={16}
											onClick={() => {
												const newTags = tags.filter((t, i) => i !== index);
												setTags(newTags);
											}}
										/>
									</Badge>
								))}
							</div>
						)}

						<Input
							type="text"
							id="tag"
							placeholder="New tag here"
							onFocus={() => {
								if (tags.length > 0) {
									toast.info(`Existing tags: ${tags.join(', ')}`);
								} else {
									toast.info('No existing tags');
								}
							}}
							onKeyDown={handleAddTag}
						/>

						<Dialog open={tagCreationDialogOpen}>
							<CreateTagDialogContent />
						</Dialog>
					</div>
				</div>
				<div className="w-full min-h-48">
					<Label>Content</Label>
					<MdEditor modelValue={content} onChange={setContent} language='en-us' tabWidth={2} />
				</div>
				<div className="flex flex-row gap-x-2">
					<Button onClick={publish}>Publish</Button>
					<Button variant={'outline'} disabled>Draft</Button>
					<Button variant={'ghost'} className="text-gray-600">Cancel</Button>
				</div>
			</div>
		</ManagementLayout>
	)

	function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && e.currentTarget.value) {
			if (tags.includes(e.currentTarget.value)) {
				toast.error('Tag already exists');
			} else {
				setTags([...tags, e.currentTarget.value]);
				e.currentTarget.value = '';
			}
			e.preventDefault();
		}
	}

	function CreateTagDialogContent() {
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
	
		return (
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new tag</DialogTitle>
					<DialogDescription>
						The tag you typed does not exist. Do you want to create a new one?
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
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
					</form>
					<DialogFooter>
						<Button type="submit" variant={'default'}>Submit</Button>
						<DialogClose asChild>
							<Button variant={'ghost'}>Cancel</Button>
						</DialogClose>
					</DialogFooter>
				</Form>
			</DialogContent>
		)
	
		async function onSubmit(values: z.infer<typeof formSchema>) {
			try {
				const response = await fetch('/api/tag/create', {
					method: 'POST',
					body: JSON.stringify(values)
				});
				const data = await response.json();
				if (response.ok) {
					toast("Tag created successfully");
					setTagCreationDialogOpen(false);
					return true;
				} else {
					toast(data.message || "Failed to create tag");
					return false;
				}
			} catch (error) {
				toast("Failed to create tag");
				console.error(error);
				return false;
			}
		}
	}
}
