import React from 'react';

import { MainContent } from '@/components/layout/main-content';
import { createInitialState } from '@/context/helpers';

export const dynamic = 'force-dynamic';
export default async function CreateInvoicePage() {
  const [appConfigPromise, clientsPromise, itemsPromise] = await Promise.all([
    fetch(`${process.env.API_PATH}/api/appConfig`, {
      next: {
        revalidate: 1,
      },
    }),
    fetch(`${process.env.API_PATH}/api/clients`, {
      next: {
        revalidate: 1,
      },
    }),
    fetch(`${process.env.API_PATH}/api/items`, {
      next: {
        revalidate: 1,
      },
    }),
  ]);

  const appConfig = await appConfigPromise.json();
  const { clients } = await clientsPromise.json();
  const { items } = await itemsPromise.json();

  const initialState = createInitialState(appConfig, clients, items);

  return <MainContent initialState={initialState} />;
}
