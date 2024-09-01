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
import { currencies } from '@/assets/currencies';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../create-invoice/create-invoice-form';

// type Props = {
// 	data: {
// 		value: string;
// 		label: string;
// 		description: string;
// 		icon: string;
// 	}[];
// };

type Props = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const CurrencySelector: React.FC<Props> = ({ form }) => {
	const [open, setOpen] = useState(false);

	const values = form.getValues('invoice.currency');

	const icon = currencies.find((cur) => cur.label === values)?.icon;

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
						icon={icon ?? currencies[0].icon}
						className="fill-dark-gray w-5 h-5"
					/>
					{values
						? currencies.find((cur) => cur.label === values)?.value
						: currencies[0].label}
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
						<CommandEmpty>No currency found.</CommandEmpty>
						<CommandGroup className="p-0">
							{currencies.map((cur) => (
								<CommandItem
									className="data-[selected=true]:bg-light-blue py-4 pl-4 gap-3"
									key={cur.value}
									value={cur.label}
									onSelect={(currentValue) => {
										form.setValue(
											'invoice.currency',
											currentValue === values ? '' : currentValue
										);
										setOpen(false);
									}}
								>
									{/* <Check
										className={cn(
											'mr-2.5 h-4 w-4',
											value === cur.value ? 'opacity-100' : 'opacity-0'
										)}
									/> */}
									<IconComponent
										icon={cur.icon}
										className="fill-dark-gray w-8 h-8"
									/>
									<div className="flex flex-col">
										<span className="text-base">{cur.label}</span>
										<span className="text-xs">{cur.description}</span>
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
