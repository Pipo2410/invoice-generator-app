import { notFound } from 'next/navigation';
import React from 'react';

import { InvoiceActions } from '@/components/invoices/detail-page/invoice-actions/invoice-actions';
import { InvoicePreview } from '@/components/invoices/detail-page/invoice-preview/invoice-preview';
import { Header } from '@/components/layout/create-invoice-header';
import { Toaster } from '@/components/ui/toaster';
import { AppConfig } from '@/context/model';
import { fetchData } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Props = {
  params: { id: string };
};

export default async function InvoicePage({ params }: Props) {
  let response;
  let appConfig: AppConfig;
  try {
    response = await fetchData(`/invoices/${params.id}`);
    appConfig = await fetchData(`/appConfig`);
  } catch (error) {
    notFound();
  }
  if (!response.ok) {
    notFound();
  }

  const { invoice } = response;

  return (
    <main className="relative mb-10 flex w-full flex-col gap-10">
      <Header invoiceNumber={invoice.invoiceId}>
        <p>{invoice.client.businessName}</p>
      </Header>
      <div className="grid grid-cols-12">
        <div className="col-span-full xl:col-span-7 xl:mr-[75px]">
          <InvoicePreview invoice={invoice} appConfig={appConfig} />
        </div>
        <div className="col-span-full xl:col-span-5">
          <InvoiceActions invoice={invoice} />
        </div>
      </div>
      <Toaster />
    </main>
  );
}
