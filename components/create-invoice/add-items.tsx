'use client';

import React, { useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { AutoComplete } from './autocomplete';

const items = [
	{ value: 'item name', label: 'Item name', price: 'Unit price' },
	{ value: 'Branding website', label: 'Branding website', price: '2.345,00€' },
	{
		value: 'branding guidelines',
		label: 'Branding guidelines',
		price: '1.550,00€',
	},
];

export const AddItems = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<string>('');

	const filteredItems = items.filter((item) =>
		item.value.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1" className="w-full">
				<AccordionTrigger
					icon="plus"
					className="flex-none py-2 px-3 my-4 gap-1 text-dark-blue hover:text-dark-blue data-[state=open]:bg-dark-blue data-[state=open]:text-white rounded-full transition-colors hover:no-underline"
				>
					Add items
				</AccordionTrigger>
				<AccordionContent className="py-0 my-4">
					<AutoComplete
						selectedValue={selectedValue}
						onSelectedValueChange={setSelectedValue}
						searchValue={searchValue}
						onSearchValueChange={setSearchValue}
						items={filteredItems ?? []}
						// Optional props
						emptyMessage="No items found."
						placeholder="Search or create an item"
						inputClassNames="w-full h-fit py-5 justify-between text-base text-foreground font-normal placeholder:text-dark-gray placeholder:text-base border-none rounded-2xl"
						iconClassName="mr-3 h-6 w-6"
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
