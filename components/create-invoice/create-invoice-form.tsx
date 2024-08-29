'use client';
import { currencies } from '@/assets/currencies';
import { IssueDate } from '@/components/create-invoice/issue-date';
import { CurrencySelector } from '@/components/navigation/currency-selector';
import { VatArticleSelector } from '@/components/navigation/vat-article-selector';
import { Separator } from '@/components/ui/separator';

import { AddItems } from '@/components/create-invoice/add-items';
import { AdditionalOptions } from '@/components/create-invoice/additional-options';
import { Summary } from '@/components/create-invoice/summary';
import { DueDate } from '@/components/create-invoice/due-date-calendar';
import { ClientSelector } from '@/components/create-invoice/client-selector';
import { useState } from 'react';
import { AddedItem } from './added-item';

export const randomItems: Item[] = [
	{
		id: 1,
		name: 'Branding development',
		description: 'Halo halo',
		type: 'Service',
		quantity: 4,
		price: 1250,
		VatOption: 23,
		discount: 10,
		currency: '€',
	},
	{
		id: 2,
		name: 'Software development',
		description: 'Halo halo',
		type: 'Service',
		quantity: 4,
		price: 1250,
		VatOption: 23,
		discount: 10,
		currency: '€',
	},
	{
		id: 3,
		name: 'Company development',
		description: 'Halo halo',
		type: 'Service',
		quantity: 4,
		price: 1250,
		VatOption: 23,
		discount: 10,
		currency: '€',
	},
];

export type Item = {
	id: number;
	name: string;
	description: string;
	type: string;
	quantity: number;
	price: number;
	VatOption: number;
	discount: number;
	currency: string;
};

export const CreateInvoiceForm = () => {
	const [items, setItems] = useState<Item[]>(randomItems);

	return (
		<form action="" className="flex flex-col gap-6 mb-40">
			<CurrencySelector data={currencies} />
			<ClientSelector />
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<IssueDate />
					<DueDate />
				</div>
				<VatArticleSelector />
			</div>
			<div>
				<Separator />
				<AddItems />
				<Separator />
				{!!items.length &&
					items.map((item) => (
						<AddedItem key={item.name} item={item} setItems={setItems} />
					))}
				<AdditionalOptions />
				<Separator />
			</div>
			<div className="summary">
				<Summary />
			</div>
		</form>
	);
};
