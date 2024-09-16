import React from 'react';

import { MainContent } from '@/components/layout/main-content';
import { fetchData } from '@/lib/utils';
import { createInitialState } from '@/utils/helpers';
import { AppConfig, Client, FormType, Item } from '@/utils/model';

export const dynamic = 'force-dynamic';
export default async function CreateInvoicePage() {
  const [appConfig, clientData, itemsData, invoicesData]: [AppConfig, Client[], Item[], FormType[]] = await Promise.all(
    [fetchData('appConfig'), fetchData('clients'), fetchData('items'), fetchData('invoices')],
  );

  if (!appConfig || !clientData || !itemsData || !invoicesData) {
    return <p>Some error mate</p>;
  }

  const invoiceId = invoicesData.length + 1;

  const initialState = createInitialState(appConfig, clientData, itemsData, invoiceId);

  return <MainContent initialState={initialState} invoiceId={invoiceId} />;
}
