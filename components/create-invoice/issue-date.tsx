'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './create-invoice-form';

type Props = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
	placeholder?: string;
};

export const IssueDate: React.FC<Props> = ({ form }) => {
	const [date, setDate] = useState<Date>();
	const [isOpen, setIsOpen] = useState(false);

	const dateNow = new Date();

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					size="sm"
					variant="ghost"
					className={cn(
						'w-full h-fit p-4 py-3 justify-between bg-[#F4F4F4] border border-[#F4F4F4] group focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-light-blue rounded-2xl transition-colors data-[state=open]:border data-[state=open]:border-[#E2E2E2] font-normal text-base'
						// !date && 'text-muted-foreground'
					)}
				>
					<div className="flex flex-col text-start">
						{(date || dateNow) && (
							<>
								<span className="text-dark-gray text-xs">Issue date</span>
								<span className="leading-[22px]">
									{format(date || dateNow, 'PPP')}
								</span>
							</>
						)}
					</div>
					<ChevronDown className="relative top-[1px] h-6 w-6 transition duration-200 group-data-[state=open]:rotate-180" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<FormField
					control={form.control}
					name="invoice.date.issueDate"
					render={({ field }) => {
						// console.log(field);
						return (
							<FormItem>
								<FormControl>
									<Calendar
										mode="single"
										// selected={dateNow}
										selected={field.value}
										onSelect={(value) => {
											setDate(value);
											setIsOpen(false);
											field.onChange(value);
										}}
										initialFocus
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};
