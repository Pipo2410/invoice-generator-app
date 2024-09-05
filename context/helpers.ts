import { currencies } from '@/assets/currencies';
import { FormType } from '@/components/layout/content';

import { Client, InitialCreateInvoiceState, Items, VatExemption } from './model';

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
    items: [],
    currency: currencies[0].label,
  },
};

export const CLIENTS_ARRAY: Client[] = [
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

export const VAT_ARTICLES: VatExemption[] = [
  {
    value: 'M01',
    label: '1 Article 16(6) of CIVA',
  },
  {
    value: 'M02',
    label: 'Article 6 of Decree-Law 198/90 of June 19th',
  },
  {
    value: 'M04',
    label: 'Exempt Article 13 of CIVA',
  },
  {
    value: 'M05',
    label: 'Exempt Article 14 of CIVA',
  },
  {
    value: 'M06',
    label: 'Exempt Article 15 of CIVA',
  },
];

export const INVOICE_ITEMS_ARRAY: Items = [
  {
    id: 1,
    name: 'Branding development',
    description: '1234',
    category: 'Service',
    unit: 1,
    price: 0,
    vat: 23,
    discount: 10,
  },
  {
    id: 2,
    name: 'Software development',
    description: '1562',
    category: 'Service',
    unit: 1,
    price: 0,
    vat: 23,
    discount: 10,
  },
  {
    id: 3,
    name: 'Company development',
    description: '1827',
    category: 'Service',
    unit: 1,
    price: 0,
    vat: 23,
    discount: 10,
  },
];

export const DEFAULT_CLIENT = {
  businessName: '',
  email: '',
  nif: undefined,
  country: '',
  currency: '',
};

// InitialCreateInvoiceState
export const createInitialState = (articles: VatExemption[]): InitialCreateInvoiceState => {
  const initialState = {
    showPreview: true,
    clients: CLIENTS_ARRAY,
    // vatArticles: VAT_ARTICLES,
    vatArticles: articles,
    // invoices: {
    //   date: {
    //     issueDate: new Date(),
    //   },
    //   client: {
    //     businessName: 'Tech Solutions Ltd.',
    //     email: 'contact@techsolutions.com',
    //     nif: 123456789,
    //     country: 'Germany',
    //     currency: 'EUR',
    //     address: {
    //       street: '123 Innovation Street',
    //       city: 'Berlin',
    //       postalCode: '10115',
    //       additional: '4th Floor, Office 403',
    //     },
    //   },
    //   vatExemption: {
    //     value: 'VAT12345',
    //     label: 'Exempt under EU regulation',
    //   },
    //   items: [
    //     {
    //       name: 'Web Development Services',
    //       description: 'Development of a company website using React and Node.js',
    //       category: 'Software Development',
    //       unit: 1,
    //       price: 5000,
    //       vat: 19, // 19% VAT rate
    //       discount: 10, // 10% discount
    //     },
    //     {
    //       name: 'Monthly Maintenance',
    //       description: 'Website maintenance for 1 month',
    //       category: 'Maintenance',
    //       unit: 2,
    //       price: 200,
    //       vat: 19,
    //       discount: 0, // No discount
    //     },
    //   ],
    //   retention: {
    //     checked: true,
    //     value: 5, // 5% retention
    //   },
    //   globalDiscount: {
    //     checked: false,
    //     value: undefined, // No global discount applied
    //   },
    //   purchaseOrder: 'PO-45678',
    //   referenceNote: 'Please include reference when making payment',
    // },
  };
  return structuredClone(initialState);
};
