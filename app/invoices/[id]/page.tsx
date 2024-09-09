import { notFound } from 'next/navigation';
import React from 'react';

import { Header } from '@/components/layout/create-invoice-header';
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

  const { invoice } = response;

  if (!response.ok) {
    notFound();
  }

  return (
    <>
      <Header invoiceNumber={invoice.id} />
    </>
  );
}
// console.log('data');
// console.log(JSON.stringify(selectedInvoice, null, 2));
// console.log('data');
