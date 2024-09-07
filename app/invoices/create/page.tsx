import React from 'react';

import { ItemsApiResponse } from '@/app/api/items/route';
import { MainContent } from '@/components/layout/main-content';
import { createInitialState } from '@/context/helpers';
import { AppConfig, Client } from '@/context/model';
import { fetchData } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export default async function CreateInvoicePage() {
  const [appConfig, clientData, itemsData]: [AppConfig, { clients: Client[] }, ItemsApiResponse] = await Promise.all([
    fetchData('appConfig'),
    fetchData('clients'),
    fetchData('items'),
  ]);

  const initialState = createInitialState(appConfig, clientData.clients, itemsData.items);

  return <MainContent initialState={initialState} />;
}
