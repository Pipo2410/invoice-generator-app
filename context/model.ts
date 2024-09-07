import { z } from 'zod';

const CurrencySchema = z.object({
  value: z.string(),
  isDefault: z.boolean().default(false),
});

const DateSchema = z.object({
  issueDate: z.date(),
  dueDate: z.date(),
});

const VatExemptionSchema = z.object({
  value: z.string(),
  label: z.string().optional(),
});

const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  unit: z.number(),
  price: z.number(),
  vat: z.number(),
  discount: z.number(),
});

const ClientSchema = z.object({
  businessName: z.string(),
  email: z.string(),
  nif: z.number(),
  country: z.string(),
  currency: CurrencySchema,
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      postalCode: z.string(),
      additional: z.string(),
    })
    .optional(),
});

export const formSchema = z.object({
  invoice: z.object({
    client: ClientSchema,
    date: DateSchema,
    vatExemption: VatExemptionSchema,
    items: z.array(ItemSchema).min(1),
    additionalOptions: z.object({
      purchaseOrder: z.string(),
      referenceNote: z.string(),
    }),
    currency: CurrencySchema,
  }),
});

export type FormType = z.infer<typeof formSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type Date = z.infer<typeof DateSchema>;
export type VatExemption = z.infer<typeof VatExemptionSchema>;
export type Item = z.infer<typeof ItemSchema>;

// figure out these ||
// figure out these ||
// figure out these ||
// figure out these ||
// figure out these \/

// export type Clientss = {
//   businessName?: string;
//   email?: string;
//   nif?: number;
//   country?: string;
//   currency?: string;
//   address?: Client['address'];
// };

// export type InvoiceDate = {
//   issueDate: Date;
//   dueDate?: Date;
// };

// export type VATExemption = {
//   value?: string;
//   label?: string;
// };

// type Itemss = {
//   name?: string;
//   description?: string;
//   category?: string;
//   unit?: number;
//   price?: number;
//   vat?: number;
//   discount?: number;
// };

// type CheckboxItem = {
//   checked?: boolean;
//   value?: number;
// };

// export type Invoice = {
//   client?: Clientss;
//   date: InvoiceDate;
//   vatExemption?: VATExemption;
//   items?: Itemss[];
//   retention?: CheckboxItem;
//   globalDiscount?: CheckboxItem;
//   purchaseOrder?: string;
//   referenceNote?: string;
// };

export type AppConfig = {
  vatArticles: VatExemption[];
  itemCategories: { value: string; label: string };
  languages: {
    value: string;
    label: string;
    icon: string;
  }[];
  currencies: {
    value: string;
    label: string;
    description: string;
    icon: string;
    sign: string;
  }[];
};

export type InitialCreateInvoiceState = {
  showPreview: boolean;
  appConfig: AppConfig;
  clients: Client[];
  items: Item[];
};
