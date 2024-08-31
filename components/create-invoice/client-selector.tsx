'use client';
import { useState } from 'react';
import { AutoComplete } from './autocomplete';
import { ClientCard } from './client-card';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './create-invoice-form';

const items = [
	{
		businessName: 'Pedro',
		email: 'Pipo2410@gmail.com',
		nif: 309643090,
		country: 'Slovakia',
		currency: 'EUR',
		address: {
			street: 'Rua de sao Bento',
			city: 'Lisboa',
			postalCode: '1254-223',
			additional: '1dt-1e',
		},
	},
];

type Props = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const ClientSelector: React.FC<Props> = ({ form }) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<string>('');
	const selected = items.filter((el) => el.businessName === selectedValue);

	console.log(selected);
	// form.setValue('invoice.client', selected);

	const { errors } = form.formState;

	const newItems = items.map((item) => {
		return {
			value: item.businessName,
			label: `${item.nif}`,
			price: `${item.nif}`,
		};
	});

	const filteredItems = newItems.filter((item) =>
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
					error={!!errors.invoice?.client}
				/>
			)}

			{selectedValue && <ClientCard setSelectedValue={setSelectedValue} />}
		</>
	);
};
