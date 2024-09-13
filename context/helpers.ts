import { ZodIssue } from 'zod';

import { currencies } from '@/assets/currencies';

import { AppConfig, Client, InitialCreateInvoiceState, IssuedInvoice, Item } from './model';

export const formDefaultValues = {
  client: {
    businessName: '',
    email: '',
    // nif: null,
    country: 'Portugal',
    currency: {
      value: 'EUR',
      isDefault: false,
    },
  },
  date: {
    issueDate: new Date(),
  },
  items: [],
  currency: {
    value: currencies[0].value,
    isDefault: false,
  },
  additionalOptions: {
    purchaseOrder: '',
    referenceNote: '',
  },
};

export const DEFAULT_CLIENT = {
  businessName: '',
  email: '',
  nif: undefined,
  country: '',
  currency: '',
};

export const createInitialState = (
  appConfig: AppConfig,
  clients: Client[],
  items: Item[],
  invoiceId: number,
): InitialCreateInvoiceState => {
  const initialState = {
    showPreview: true,
    clients,
    appConfig,
    items,
    invoiceId,
  };
  return structuredClone(initialState);
};

export const mapErrorsToFields = (errors: Array<ZodIssue>) =>
  errors.reduce(
    (acc, error) => {
      const fieldName = error.path[0];
      acc[fieldName] = error.message; // Store the error message for each field
      return acc;
    },
    {} as Record<string, string | null>,
  );

export const statusVariantMap: Record<IssuedInvoice['status'], 'warning' | 'success' | 'destructive' | 'outline'> = {
  draft: 'warning',
  paid: 'success',
  overdue: 'destructive',
  issued: 'outline', // issued as the default or neutral state
};
