import { currencies } from '@/assets/currencies';

import { AppConfig, Client, InitialCreateInvoiceState, Item } from './model';

export const formDefaultValues = {
  client: {
    businessName: '',
    email: '',
    // nif: null,
    country: 'Portugal',
    currency: {
      value: 'EUR',
      isDefault: true,
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
