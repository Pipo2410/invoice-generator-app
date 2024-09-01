import { currencies } from '@/assets/currencies';

export const formDefaultValues = {
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
};
