'use client';
import { Trash2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { currencies } from '@/assets/currencies';
import { FormType } from '@/components/layout/content';
import { Items } from '@/context/model';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type Props = {
	item: Items[number];
	form: UseFormReturn<FormType>;
	itemIndex: number;
};

export const AddedItem: React.FC<Props> = ({ item, form, itemIndex }) => {
	const { getValues } = form;

	const {
		invoice: { currency, items },
	} = getValues();

	const currencySign = currencies.find((el) => el.label === currency)?.sign;
	const filteredItems = items.filter((el) => el.name !== item.name);

	return (
		<>
			<div className="flex flex-col gap-3 my-6">
				<div className="flex gap-2 items-center">
					<FormField
						control={form.control}
						name={`invoice.items.${itemIndex}`}
						render={({ field }) => {
							return (
								<FormItem className="space-y-0 flex w-full">
									<FormControl>
										<Input
											className={cn(
												'text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent'
											)}
											{...field}
											value={item.name}
										/>
									</FormControl>
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem className="space-y-0 flex w-full">
								<FormControl>
									<Input
										placeholder={item.description}
										className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Trash2
						size={48}
						className="hover:cursor-pointer"
						onClick={() => {
							// setItems((prev) => prev.filter((el) => el.id !== item.id));
							form.setValue('invoice.items', filteredItems); // gets ts error when items.array.nonEmpty() from zod
						}}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem className="w-1/5">
								<Select>
									<SelectTrigger className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem className="w-1/5">
								<Select>
									<SelectTrigger className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem className="w-1/5">
								<Input
									placeholder={`${item.price} ${currencySign}`}
									className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
								/>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem className="w-1/5">
								<Select>
									<SelectTrigger className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="invoice.items"
						render={({ field }) => (
							<FormItem className="w-1/5">
								<Input
									placeholder={`${item.discount} %`}
									className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
								/>
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator />
		</>
	);
};
