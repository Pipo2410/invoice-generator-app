'use client';
import { ActionBar } from '@/components/footer/action-bar';
import { IssueDate } from '@/components/create-invoice/issue-date';
import { CurrencySelector } from '@/components/navigation/currency-selector';
import { VatArticleSelector } from '@/components/navigation/vat-article-selector';
import { Separator } from '@/components/ui/separator';

import { AdditionalOptions } from '@/components/create-invoice/additional-options';
import { Summary } from '@/components/create-invoice/summary';
import { DueDate } from '@/components/create-invoice/due-date-calendar';
import { ClientSelector } from '@/components/create-invoice/client-selector';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PreviewInvoice } from '../preview-invoice/preview-invoice';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { currencies } from '@/assets/currencies';
import { InvoiceItems } from './invoice-items';

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
		client: z.object({
			businessName: z.string(),
			email: z.string(),
			nif: z.number(),
			country: z.string(),
			currency: z.string(),
			defaultCurrency: z.boolean(),
			address: z
				.object({
					street: z.string(),
					city: z.string(),
					postalCode: z.string(),
					additional: z.string(),
				})
				.optional(),
		}),
		date: z.object({
			issueDate: z.date(),
			dueDate: z.date(),
		}),
		vatExemption: z.object({
			value: z.string(),
			label: z.string().optional(),
		}),
		items: z.array(
			z.object({
				id: z.number(),
				name: z.string(),
				description: z.string(),
				category: z.string(),
				unit: z.number(),
				price: z.number(),
				vat: z.number(),
				discount: z.number(),
			})
		),
		currency: z.string(),
	}),
});

export type FormType = z.infer<typeof formSchema>;

export const CreateInvoiceForm = () => {
	const [showPreview, setShowPreview] = useState(true);

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			invoice: {
				client: {
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
				date: {
					issueDate: new Date(),
				},
				items: [
					{
						id: 1,
						name: 'Branding development',
						description: 'Halo halo',
						category: 'Service',
						unit: 4,
						price: 1250,
						vat: 23,
						discount: 10,
					},
					{
						id: 2,
						name: 'Software development',
						description: 'Halo halo',
						category: 'Service',
						unit: 4,
						price: 1250,
						vat: 23,
						discount: 10,
					},
					{
						id: 3,
						name: 'Company development',
						description: 'Halo halo',
						category: 'Service',
						unit: 4,
						price: 1250,
						vat: 23,
						discount: 10,
					},
				],
				currency: currencies[0].label,
			},
		},
	});

	console.log('Im re-rendered - create-invoice');

	const onSubmitHandler = (values: z.infer<typeof formSchema>) => {
		// console.log(values);
		// console.log('values');
	};

	return (
		<div className="grid grid-cols-12 gap-[75px]">
			<FormProvider {...form}>
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
							<CurrencySelector form={form} />
							<ClientSelector form={form} />
							<div className="flex flex-col gap-4">
								<div className="flex gap-4">
									<IssueDate form={form} />
									<DueDate form={form} />
								</div>
								<VatArticleSelector form={form} />
							</div>
							<div>
								<Separator />
								<InvoiceItems form={form} />
								<AdditionalOptions />
								{/* <Separator /> */}
							</div>
							<div className="summary">
								<Summary />
							</div>
							<ActionBar setShowPreview={setShowPreview} />
						</form>
					</Form>
				</div>
				{showPreview && <PreviewInvoice setShowPreview={setShowPreview} />}
			</FormProvider>
		</div>
	);
};
