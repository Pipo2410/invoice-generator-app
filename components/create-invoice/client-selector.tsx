'use client';
import React, { useState } from 'react';
import { AutoComplete } from './autocomplete';
import { ClientCard } from './client-card';

const items = [
	{ value: 'item name', label: 'Item name', price: 'Unit price' },
	{ value: 'Branding website', label: 'Branding website', price: '2.345,00€' },
	{
		value: 'branding guidelines',
		label: 'Branding guidelines',
		price: '1.550,00€',
	},
];

export const ClientSelector = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<string>('');

	const filteredItems = items.filter((item) =>
		item.value.toLowerCase().includes(searchValue.toLowerCase())
	);
	return (
		<>
			{!selectedValue && (
				<AutoComplete
					selectedValue={selectedValue}
					onSelectedValueChange={setSelectedValue}
					searchValue={searchValue}
					onSearchValueChange={setSearchValue}
					items={filteredItems ?? []}
					// Optional props
					emptyMessage="No items found."
					placeholder="Search or add a client..."
					inputClassNames="w-full h-fit py-5 justify-between text-base text-foreground font-normal placeholder:text-dark-gray placeholder:text-base border-none rounded-2xl"
					iconClassName="mr-3 h-6 w-6"
				/>
			)}

			{selectedValue && <ClientCard setSelectedValue={setSelectedValue} />}
		</>
	);
};
