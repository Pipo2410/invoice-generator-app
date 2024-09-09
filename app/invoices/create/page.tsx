import React from 'react';

import { ItemsApiResponse } from '@/app/api/items/route';
import { MainContent } from '@/components/layout/main-content';
import { createInitialState } from '@/context/helpers';
import { AppConfig, Client, FormType } from '@/context/model';
import { fetchData } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export default async function CreateInvoicePage() {
  const [appConfig, clientData, itemsData, invoicesData]: [
    AppConfig,
    { clients: Client[] },
    ItemsApiResponse,
    { invoice: FormType; length: number },
  ] = await Promise.all([fetchData('appConfig'), fetchData('clients'), fetchData('items'), fetchData('invoices')]);

  const initialState = createInitialState(appConfig, clientData.clients, itemsData.items);

  return <MainContent initialState={initialState} invoiceId={invoicesData.length + 1} />;
}
