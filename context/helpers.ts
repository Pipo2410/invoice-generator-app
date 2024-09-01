import { currencies } from '@/assets/currencies';
import { Client } from './model';

export const formDefaultValues = {
	invoice: {
		client: {
			businessName: '',
			email: '',
			nif: undefined,
			country: '',
			currency: '',
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
};

export const clientsArray: Client[] = [
	{
		businessName: 'Client 12',
		email: 'client12@gmail.com',
		nif: 309643090,
		country: 'Portugal',
		currency: 'EUR',
		defaultCurrency: 'EUR',
		address: {
			street: 'Rua de sao Bento 644',
			city: 'Lisboa',
			postalCode: '1254-223',
			additional: '1dt-1e',
		},
	},
	{
		businessName: 'Google',
		email: 'Google@gmail.com',
		nif: 858356421,
		country: 'Portugal',
		currency: 'EUR',
		defaultCurrency: 'EUR',
		address: {
			street: 'Calcada do monte 13',
			city: 'Lisboa',
			postalCode: '1254-223',
			additional: '1dt-1e',
		},
	},
	{
		businessName: 'Company Abc',
		email: 'company.abc@gmail.com',
		nif: 329643090,
		country: 'Portugal',
		currency: 'EUR',
		defaultCurrency: 'EUR',
		address: {
			street: 'Rua de Joao jorge 234',
			city: 'Lisboa',
			postalCode: '1254-213',
			additional: '4dt-1dto',
		},
	},
];
