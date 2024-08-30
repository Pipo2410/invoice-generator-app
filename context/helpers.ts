import { InitialCreateInvoiceState, Invoice } from './model';

export const createInitialState = () => {
	const initialState: InitialCreateInvoiceState = {
		showPreview: true,
		invoice: {
			date: {
				issueDate: new Date(),
			},
			client: {
				businessName: 'Tech Solutions Ltd.',
				email: 'contact@techsolutions.com',
				nif: 123456789,
				country: 'Germany',
				currency: 'EUR',
				address: {
					street: '123 Innovation Street',
					city: 'Berlin',
					postalCode: '10115',
					additional: '4th Floor, Office 403',
				},
			},
			vatExemption: {
				value: 'VAT12345',
				label: 'Exempt under EU regulation',
			},
			items: [
				{
					name: 'Web Development Services',
					description:
						'Development of a company website using React and Node.js',
					category: 'Software Development',
					unit: 1,
					price: 5000,
					vat: 19, // 19% VAT rate
					discount: 10, // 10% discount
				},
				{
					name: 'Monthly Maintenance',
					description: 'Website maintenance for 1 month',
					category: 'Maintenance',
					unit: 2,
					price: 200,
					vat: 19,
					discount: 0, // No discount
				},
			],
			retention: {
				checked: true,
				value: 5, // 5% retention
			},
			globalDiscount: {
				checked: false,
				value: undefined, // No global discount applied
			},
			purchaseOrder: 'PO-45678',
			referenceNote: 'Please include reference when making payment',
		},
	};
	return structuredClone(initialState);
};
