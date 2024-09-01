'use client';
import { Separator } from '../ui/separator';
import { formSchema, FormType } from './create-invoice-form';
import { Input } from '../ui/input';
import { Trash2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { currencies } from '@/assets/currencies';

type Props = {
	item: FormType['invoice']['items'][number];
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const AddedItem: React.FC<Props> = ({ item, form }) => {
	const { getValues } = form;

	const {
		invoice: { currency, items },
	} = getValues();

	const currencySign = currencies.find((el) => el.label === currency)?.sign;
	const filteredItems = items.filter((el) => el.id !== item.id);

	return (
		<>
			<div className="flex flex-col gap-3 my-6">
				<div className="flex gap-2 items-center">
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Username</FormLabel> */}
								<FormControl>
									<Input
										placeholder={item.name}
										// value={field.value}
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
							// setItems((prev) => prev.filter((el) => el.id !== item.id));
							form.setValue('invoice.items', filteredItems);
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
						placeholder={`${item.price} ${currencySign}`}
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
