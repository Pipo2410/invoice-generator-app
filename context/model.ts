import { FormType } from '@/components/create-invoice/create-invoice-form';
import { z } from 'zod';

export const formSchema = z.object({
	invoice: z.object({
		client: z.object({
			businessName: z.string(),
			email: z.string(),
			nif: z.number(),
			country: z.string(),
			currency: z.string(),
			defaultCurrency: z.string(),
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
		additionalOptions: z.object({
			purchaseOrder: z.string(),
			referenceNote: z.string(),
		}),
		currency: z.string(),
	}),
});

export type Client = FormType['invoice']['client'];
export type Date = FormType['invoice']['date'];
export type VatExemption = FormType['invoice']['vatExemption'];
export type Items = FormType['invoice']['items'];
