"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const CreateCategoryComponent: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
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

	return (
		<Sheet open={open} onOpenChange={(e) => setOpen(e)}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className='flex flex-col gap-y-4'>
				<SheetHeader>
					<SheetTitle>Create new category</SheetTitle>
					<SheetDescription>
						Create a new category to organize your articles
					</SheetDescription>
				</SheetHeader>
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
					<SheetFooter>
						<Button type="submit" variant={'default'}>Submit</Button>
						<SheetClose asChild>
							<Button variant={'ghost'} onClick={() => setOpen(false)}>Cancel</Button>
						</SheetClose>
					</SheetFooter>
				</Form>
			</SheetContent>
		</Sheet>
	);

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
}

export default CreateCategoryComponent;