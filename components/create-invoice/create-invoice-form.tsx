'use client';
import { currencies } from '@/assets/currencies';
import { ActionBar } from '@/components/footer/action-bar';
import { IssueDate } from '@/components/create-invoice/issue-date';
import { CurrencySelector } from '@/components/navigation/currency-selector';
import { VatArticleSelector } from '@/components/navigation/vat-article-selector';
import { Separator } from '@/components/ui/separator';

import { AddItems } from '@/components/create-invoice/add-items';
import { AdditionalOptions } from '@/components/create-invoice/additional-options';
import { Summary } from '@/components/create-invoice/summary';
import { DueDate } from '@/components/create-invoice/due-date-calendar';
import { ClientSelector } from '@/components/create-invoice/client-selector';
import { FormEvent, useState } from 'react';
import { AddedItem } from './added-item';
import { useCreateInvoiceFormContext } from '@/context/create-invoice-context';
import { cn } from '@/lib/utils';
import { PreviewInvoice } from '../preview-invoice/preview-invoice';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';

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

export const formSchema = z.object({
	invoice: z.object({
		date: z.object({
			issueDate: z.coerce.date(),
			dueDate: z.date(),
		}),
	}),
	// name: z.string().max(20),
});

export const CreateInvoiceForm = () => {
	const [items, setItems] = useState<Item[]>(randomItems);
	const { showPreview, invoice } = useCreateInvoiceFormContext();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			invoice: {
				date: {
					issueDate: new Date(),
				},
			},
		},
	});

	const { errors } = form.formState;
	// console.log(errors);

	const onSubmitHandler = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		console.log('values');
	};

	return (
		<div className="grid grid-cols-12 gap-[75px]">
			<div
				className={cn(
					showPreview ? 'col-span-full xl:col-span-7' : 'col-span-10'
				)}
			>
				<Form {...form}>
					<form
						action=""
						className="flex flex-col gap-6 mb-40"
						onSubmit={form.handleSubmit(onSubmitHandler)}
					>
						<CurrencySelector data={currencies} />
						<ClientSelector />
						<div className="flex flex-col gap-4">
							<div className="flex gap-4">
								<IssueDate form={form} />
								<DueDate form={form} />
							</div>
							<VatArticleSelector />
						</div>
						<div>
							<Separator />
							<AddItems />
							{/* <Separator /> */}
							{!!items.length &&
								items.map((item) => (
									<AddedItem key={item.name} item={item} setItems={setItems} />
								))}
							<AdditionalOptions />
							{/* <Separator /> */}
						</div>
						<div className="summary">
							<Summary />
						</div>
						<ActionBar />
					</form>
				</Form>
			</div>
			{showPreview && <PreviewInvoice />}
		</div>
	);
};
