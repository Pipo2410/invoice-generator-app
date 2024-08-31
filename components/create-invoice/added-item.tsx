'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { Separator } from '../ui/separator';
import { formSchema, Item } from './create-invoice-form';
import { Input } from '../ui/input';
import { Trash2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';

type Props = {
	item: Item;
	setItems: Dispatch<SetStateAction<Item[]>>;
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const AddedItem: React.FC<Props> = ({ item, setItems, form }) => {
	const format = useForm();
	console.log('form');
	console.log(format.getValues());
	console.log(form.formState.touchedFields);
	// const errors = form.formState..invoice?.items?.find(
	// (el) => el?.name === item.name
	// );

	return (
		<>
			<div className="flex flex-col gap-3 my-6">
				<div className="flex gap-2 items-center">
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder={item.name}
										value={field.value}
										// ref={field.ref}
										className={cn(
											'text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent'
										)}
									/>
								</FormControl>
								{/* <FormMessage /> */}
							</FormItem>
						)}
					/>
					<Input
						placeholder={item.description}
						className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
					<Trash2
						size={48}
						className="hover:cursor-pointer"
						onClick={() => {
							setItems((prev) => prev.filter((el) => el.id !== item.id));
						}}
					/>
				</div>
				<div className="flex gap-2">
					<Select>
						<SelectTrigger className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{['Service', 'SomethingElse'].map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{['Service', 'SomethingElse'].map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						placeholder={`${item.price} ${item.currency}`}
						className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
					<Select>
						<SelectTrigger className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{['Service', 'SomethingElse'].map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						placeholder={`${item.discount} %`}
						className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
				</div>
			</div>
			<Separator />
		</>
	);
};
