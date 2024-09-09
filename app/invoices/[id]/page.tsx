import { notFound } from 'next/navigation';
import React from 'react';

import { Header } from '@/components/layout/create-invoice-header';
import { fetchData } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Props = {
  params: { id: string };
};

export default async function InvoicePage({ params }: Props) {
  const data = await fetchData(`/invoices/${params.id}`);

  if (!data.ok) {
    notFound();
  }
  const { invoice } = data;

  return (
    <>
      <Header invoiceNumber={invoice.id} />
    </>
  );
}
// console.log('data');
// console.log(JSON.stringify(selectedInvoice, null, 2));
// console.log('data');
