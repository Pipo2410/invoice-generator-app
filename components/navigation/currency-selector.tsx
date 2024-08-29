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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { IconComponent } from './icon-component';

type Props = {
	data: {
		value: string;
		label: string;
		description: string;
		icon: string;
	}[];
};

export const CurrencySelector: React.FC<Props> = ({ data }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(data[0].label);

	const icon = data.find((framework) => framework.label === value)?.icon;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					role="combobox"
					aria-expanded={open}
					className="group gap-1 py-2 px-3 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 justify-start w-fit text-dark-blue hover:text-dark-blue data-[state=open]:bg-dark-blue data-[state=open]:text-white rounded-full transition-colors"
				>
					<IconComponent
						icon={icon ?? data[0].icon}
						className="fill-dark-gray w-5 h-5"
					/>
					{value
						? data.find((framework) => framework.label === value)?.value
						: data[0].label}
					<ChevronDown className="relative top-[1px] ml-1 h-5 w-5 transition duration-200 group-data-[state=open]:rotate-180" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit p-0 rounded-3xl">
				<Command className="rounded-3xl">
					<CommandInput
						searchWrapperClasses="bg-[#F4F4F4]"
						iconClassName="mr-3 h-4 w-4"
						placeholder="Search"
						className="text-base font-normal"
					/>
					<CommandList className="max-h-fit">
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup className="p-0">
							{data.map((framework) => (
								<CommandItem
									className="data-[selected=true]:bg-light-blue py-4 pl-4 gap-3"
									key={framework.value}
									value={framework.label}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									{/* <Check
										className={cn(
											'mr-2.5 h-4 w-4',
											value === framework.value ? 'opacity-100' : 'opacity-0'
										)}
									/> */}
									<IconComponent
										icon={framework.icon}
										className="fill-dark-gray w-8 h-8"
									/>
									<div className="flex flex-col">
										<span className="text-base">{framework.label}</span>
										<span className="text-xs">{framework.description}</span>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
