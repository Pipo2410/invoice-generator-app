'use client';

import React from 'react';

import { Content } from '@/components/layout/content';
import { Header } from '@/components/layout/create-invoice-header';
import { CreateInvoiceFormContextProvider } from '@/context/app-context';
import { useDefaultContext } from '@/context/default-context';
import { InitialCreateInvoiceState } from '@/context/model';

type Props = {
  initialState: InitialCreateInvoiceState;
  invoiceId: number;
};

export const MainContent: React.FC<Props> = ({ initialState, invoiceId }) => {
  const { showPreview } = useDefaultContext();
  return (
    <CreateInvoiceFormContextProvider initialState={initialState}>
      <main className="relative mb-10 flex w-full flex-col gap-10">
        <Header invoiceNumber={invoiceId} />
        <Content showPreview={showPreview} />
      </main>
    </CreateInvoiceFormContextProvider>
  );
};
