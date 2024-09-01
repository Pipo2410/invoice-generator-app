'use client';
import React, { useState } from 'react';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { FormType } from '../create-invoice/create-invoice-form';

export const VAT_ARTICLES = [
	{
		value: 'M01',
		label: '1 Article 16(6) of CIVA',
	},
	{
		value: 'M02',
		label: 'Article 6 of Decree-Law 198/90 of June 19th',
	},
	{
		value: 'M04',
		label: 'Exempt Article 13 of CIVA',
	},
	{
		value: 'M05',
		label: 'Exempt Article 14 of CIVA',
	},
	{
		value: 'M06',
		label: 'Exempt Article 15 of CIVA',
	},
];

type Props = {
	form: UseFormReturn<FormType>;
};

export const VatArticleSelector: React.FC<Props> = ({ form }) => {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const buttonValue = VAT_ARTICLES.find(
		(framework) => framework.value === selectedValue
	)?.label;

	const { errors } = form.formState;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					role="combobox"
					aria-expanded={open}
					className={cn(
						'w-full h-fit p-5 pl-4 justify-between bg-[#F4F4F4] group focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-light-blue rounded-xl transition-colors data-[state=open]:border data-[state=open]:border-[#E2E2E2]',
						errors.invoice?.vatExemption && 'border border-dark-orange'
					)}
				>
					<span className="font-normal text-base">
						{selectedValue ? buttonValue : 'VAT exemption reason'}
					</span>
					<ChevronDown className="relative top-[1px] h-6 w-6 transition duration-200 group-data-[state=open]:rotate-180" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-3xl">
				<Command className="rounded-3xl">
					<CommandInput
						searchWrapperClasses="bg-[#F4F4F4]"
						iconClassName="mr-3 h-6 w-6"
						placeholder="Search VAT article..."
						className="text-base font-normal py-4 h-fit"
					/>
					<CommandList className="max-h-fit">
						<CommandEmpty>No article found.</CommandEmpty>
						<CommandGroup className="p-0">
							{VAT_ARTICLES.map((article) => (
								<FormField
									key={article.value}
									control={form.control}
									name="invoice.vatExemption.value"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<CommandItem
													className={cn(
														'data-[selected=true]:bg-[#F8F8F8] py-4 pl-4 gap-3 rounded-none',
														selectedValue === article.value && 'bg-[#F8F8F8]'
													)}
													value={article.value}
													onSelect={(currentValue) => {
														setSelectedValue(
															currentValue === selectedValue ? '' : currentValue
														);
														setOpen(false);
														field.onChange(currentValue);
													}}
												>
													<div className="flex flex-col">
														<span className="text-base">{article.label}</span>
														<span className="text-xs">{article.value}</span>
													</div>
												</CommandItem>
											</FormControl>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
