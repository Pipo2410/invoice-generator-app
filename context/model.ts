import { z } from 'zod';

const CurrencySchema = z.object({
  value: z.string().min(1),
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
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  unit: z.number(),
  price: z.number(),
  vat: z.number(),
  discount: z.number().optional(),
  totalPrice: z.number().optional(),
});

const GlobalDiscountSchema = z
  .object({
    isSelected: z.boolean(),
    value: z.number(),
  })
  .optional();

const RetentionSchema = z
  .object({
    isSelected: z.boolean(),
    value: z.number(),
  })
  .optional();

export const ClientSchema = z.object({
  id: z.string(),
  businessName: z.string().min(1),
  email: z.string().email(),
  nif: z.string().min(9),
  country: z.string().min(2),
  currency: CurrencySchema,
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
      additional: z.string().optional(),
    })
    .refine(
      (data) => {
        const hasAnyField = data.street || data.city || data.postalCode || data.additional;
        const allFieldsAreValid =
          (data.street?.trim() || !data.street) &&
          (data.city?.trim() || !data.city) &&
          (data.postalCode?.trim() || !data.postalCode) &&
          (data.additional?.trim() || !data.additional);

        // If any field is present, check none of them are empty or whitespace
        return !hasAnyField || allFieldsAreValid;
      },
      {
        message: 'If provided, address fields must not be empty or just whitespace.',
      },
    )
    .optional(),
});

const priceSchema = z.object({
  subTotal: z.number(),
  vatTotal: z.number(),
  discountTotal: z.number(),
  retentionAmount: z.number().optional(),
  total: z.number(),
});

export const formSchema = z.object({
  invoiceId: z.number(),
  client: ClientSchema,
  date: DateSchema,
  vatExemption: VatExemptionSchema,
  items: z.array(ItemSchema).min(1),
  additionalOptions: z.object({
    purchaseOrder: z.string().min(1),
    referenceNote: z.string().min(1),
  }),
  globalDiscount: GlobalDiscountSchema,
  retention: RetentionSchema,
  currency: CurrencySchema,
  price: priceSchema,
});

export const IssuedInvoiceSchema = formSchema.extend({
  status: z.enum(['issued', 'draft', 'paid', 'overdue']),
});

export type FormType = z.infer<typeof formSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type Date = z.infer<typeof DateSchema>;
export type VatExemption = z.infer<typeof VatExemptionSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Retention = z.infer<typeof RetentionSchema>;
export type GlobalDiscount = z.infer<typeof GlobalDiscountSchema>;
export type IssuedInvoice = z.infer<typeof IssuedInvoiceSchema>;
export type Price = z.infer<typeof priceSchema>;

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
  countries: {
    value: string;
    label: string;
    icon: string;
  }[];
  companies: {
    name: string;
    nif: string;
    id: string;
  }[];
};

export type InitialCreateInvoiceState = {
  showPreview: boolean;
  appConfig: AppConfig;
  clients: Client[];
  items: Item[];
  invoiceId: number;
};
