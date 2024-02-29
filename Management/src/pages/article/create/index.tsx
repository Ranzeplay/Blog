"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ManagementLayout from "@/pages/layout";
import { XCircle } from "lucide-react";

import React, { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { toast } from "sonner";

export default function Index() {
	const [content, setContent] = useState('Start typing from here...');
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [category, setCategory] = useState('');
	const [tags, setTags] = useState([] as string[]);

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
					<div className="flex flex-col gap-y-2">
						{tags.length > 0 && (
							<div className="flex flex-row gap-x-2 h-8">
								{tags.map((tag, index) => (
									<Badge key={index} variant={'outline'} className="font-normal gap-x-2">
										<span>{tag}</span>
										<XCircle
											className="cursor-pointer text-gray-400 hover:text-gray-700"
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
							onKeyDown={(e) => {
								if (e.key === 'Enter' && e.currentTarget.value) {
									if (tags.includes(e.currentTarget.value)) {
										toast.error('Tag already exists');
									} else {
										setTags([...tags, e.currentTarget.value]);
										e.currentTarget.value = '';
									}
									e.preventDefault(); // prevent form submission
								}
							}}
						/>
					</div>
				</div>
				<div className="w-full min-h-48">
					<Label>Content</Label>
					<MdEditor modelValue={content} onChange={setContent} language='en-us' tabWidth={2} />
				</div>
				<div className="flex flex-row gap-x-2">
					<Button>Publish</Button>
					<Button variant={'outline'}>Draft</Button>
					<Button variant={'ghost'} className="text-gray-600">Cancel</Button>
				</div>
			</div>
		</ManagementLayout>
	)
}
