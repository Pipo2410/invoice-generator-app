import { z } from 'zod';

import { FormType } from '@/components/layout/content';

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
    items: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          description: z.string(),
          category: z.string(),
          unit: z.number(),
          price: z.number(),
          vat: z.number(),
          discount: z.number(),
        }),
      )
      .min(1),
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

export type Address = {
  street?: string;
  city?: string;
  postalCode?: string;
  additional?: string;
};

// export type Client = {
// 	businessName?: string;
// 	email?: string;
// 	nif?: number;
// 	country?: string;
// 	currency?: string;
// 	address?: Address;
// };

export type InvoiceDate = {
  issueDate: Date;
  dueDate?: Date;
};

export type VATExemption = {
  value?: string;
  label?: string;
};

type Item = {
  name?: string;
  description?: string;
  category?: string;
  unit?: number;
  price?: number;
  vat?: number;
  discount?: number;
};

type CheckboxItem = {
  checked?: boolean;
  value?: number;
};

export type Invoice = {
  client?: Client;
  date: InvoiceDate;
  vatExemption?: VATExemption;
  items?: Item[];
  retention?: CheckboxItem;
  globalDiscount?: CheckboxItem;
  purchaseOrder?: string;
  referenceNote?: string;
};

export type InitialCreateInvoiceState = {
  showPreview: boolean;
  clients?: Client[];
  vatArticles?: VatExemption[];
  // invoice: Invoice;
};
