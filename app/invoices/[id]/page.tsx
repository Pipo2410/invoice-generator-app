import { notFound } from 'next/navigation';
import React from 'react';

import { Header } from '@/components/layout/create-invoice-header';
import { FormType } from '@/context/model';
import { fetchData } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Props = {
  params: { id: string };
};

export default async function InvoicePage({ params }: Props) {
  let response;
  try {
    response = await fetchData(`/invoices/${params.id}`);
  } catch (error) {
    notFound();
  }

  const { invoice }: { invoice: FormType } = response;

  if (!response.ok) {
    notFound();
  }

  return (
    <>
      <Header invoiceNumber={invoice.id}>
        <p>{invoice.client.businessName}</p>
      </Header>
    </>
  );
}
