'use client';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormType } from './create-invoice-form';

const options = [15, 30, 45, 60, 90];

type Props = {
	form: UseFormReturn<FormType>;
};

export const DueDate: React.FC<Props> = ({ form }) => {
	const [days, setDays] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { dueDate, issueDate } = form.getValues('invoice.date');

	const { errors } = form.formState;

	const calculateDueDate = (
		days: number,
		field: ControllerRenderProps<FormType>
	) => {
		const newDueDate = new Date();

		if (issueDate) {
			newDueDate.setDate(issueDate.getDate() + days);
		} else {
			form.trigger('invoice.date.issueDate');
			return;
		}
		setDays(days);
		field.onChange(newDueDate);
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						'w-full h-fit p-4 py-3 justify-between bg-[#F4F4F4] border border-[#F4F4F4] group focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-light-blue rounded-xl transition-colors data-[state=open]:border data-[state=open]:border-[#E2E2E2] font-normal text-base min-h-16',
						errors.invoice?.date?.dueDate && 'border-dark-orange'
					)}
				>
					<div className="flex flex-col text-start font-normal">
						{dueDate ? (
							<>
								<span className="text-dark-gray text-xs">Due date</span>
								<span className="font-normal text-base leading-[22px]">
									{days
										? `${days} days (${format(dueDate, 'PPP')})`
										: format(dueDate, 'PPP')}
								</span>
							</>
						) : (
							<span>Select due date</span>
						)}
					</div>
					<ChevronDown className="relative top-[1px] h-6 w-6 transition duration-200 group-data-[state=open]:rotate-180" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] p-4">
				{options.map((option) => (
					<FormField
						key={option}
						control={form.control}
						name="invoice.date.dueDate"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<DropdownMenuItem
										onSelect={() => calculateDueDate(option, field)}
										className="border-b text-[15px] py-4 px-2"
									>
										<span>{option} days</span>
									</DropdownMenuItem>
								</FormControl>
							</FormItem>
						)}
					/>
				))}
				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="py-4 px-2">
						<span>Choose custom date</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent className="ml-6">
							<FormField
								control={form.control}
								name="invoice.date.dueDate"
								render={({ field }) => {
									// console.log(field);
									return (
										<FormItem>
											<FormControl>
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={(value) => {
														setIsOpen(false);
														setDays(null);
														field.onChange(value);
													}}
													initialFocus
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
