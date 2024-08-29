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
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

const options = [15, 30, 45, 60, 90];

export const DueDate = () => {
	const [date, setDate] = useState<Date>();
	const [days, setDays] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const calculateDueDate = (days: number) => {
		const today = new Date();
		const newDueDate = new Date(today);

		newDueDate.setDate(today.getDate() + days);
		setDays(days);
		setDate(newDueDate);
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="w-full h-fit p-4 py-3 justify-between bg-[#F4F4F4] border border-[#F4F4F4] group focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-light-blue rounded-xl transition-colors data-[state=open]:border data-[state=open]:border-[#E2E2E2] font-normal text-base min-h-16"
				>
					<div className="flex flex-col text-start font-normal">
						{date ? (
							<>
								<span className="text-dark-gray text-xs">Due date</span>
								<span className="font-normal text-base leading-[22px]">
									{days
										? `${days} days (${format(date, 'PPP')})`
										: format(date, 'PPP')}
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
					<DropdownMenuItem
						key={option}
						onSelect={() => calculateDueDate(option)}
						className="border-b text-[15px] py-4 px-2"
					>
						<span>{option} days</span>
					</DropdownMenuItem>
				))}
				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="py-4 px-2">
						<span>Choose custom date</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent className="ml-6">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(value) => {
									setDate(value);
									setIsOpen(false);
									setDays(null);
								}}
								initialFocus
							/>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
