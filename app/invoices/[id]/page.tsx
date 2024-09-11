import { notFound } from 'next/navigation';
import React from 'react';

import { Header } from '@/components/layout/create-invoice-header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppConfig, FormType } from '@/context/model';
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

  const { invoice }: { invoice: FormType } = response;
  const { client, items } = invoice;
  const referenceNote = invoice.additionalOptions.referenceNote;

  const currencySign = appConfig.currencies.find((cur) => cur.value === invoice.currency.value)?.sign;

  const dueDate = invoice.date.dueDate;
  const dueDateValue = new Date(dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const vatExemption = invoice.vatExemption.label;

  return (
    <main className="relative mb-10 flex w-full flex-col gap-10">
      <Header invoiceNumber={invoice.id}>
        <p>{invoice.client.businessName}</p>
      </Header>
      <div className="grid grid-cols-12">
        <div className="col-span-full xl:col-span-7 xl:mr-[75px]">
          <Card className="flex w-full flex-col gap-4 rounded-2xl border-none px-4 pb-8 pt-6">
            <div className="flex flex-col gap-1 p-2">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Invoice</h3>
                <h4 className="text-xs font-semibold text-dark-gray">#123</h4>
              </div>
              <div className="flex flex-col py-4">
                <h5 className="font-semibold">Billed to</h5>
                <p className="flex justify-between text-dark-gray">
                  <span>Business name</span>
                  <span className="font-semibold">{client.businessName}</span>
                </p>
                <p className="flex justify-between text-dark-gray">
                  <span>Business address</span>
                  {client.address && <span>{client.address?.street}</span>}
                </p>
                <p className="flex justify-between text-dark-gray">
                  <span>City, Country - 0000-000</span>
                  {client.address && (
                    <span>{`${client.address?.city}, ${client.country} - ${client.address?.postalCode}`}</span>
                  )}
                </p>
                <p className="flex justify-between text-dark-gray">
                  <span>NIF</span>
                  <span>{client.nif}</span>
                </p>
              </div>
              <div className="-mx-1 flex justify-center border-b border-t border-dotted py-4">
                <div className="flex flex-col items-center">
                  <p>Due date</p>
                  {dueDate && <p className="font-semibold">{dueDateValue}</p>}
                </div>
                <Separator orientation="vertical" className="mx-5 h-auto" />
                <div className="flex flex-col items-center">
                  <p>Note or PO</p>
                  <p className="font-semibold">{referenceNote}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <p>Item</p>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-6 gap-0.5 text-end text-xs">
                  <span className="col-start-3 col-end-4">Unit price</span>
                  <span className="col-start-4 col-end-5">Units</span>
                  <span className="col-start-5 col-end-6">VAT</span>
                  <span className="col-start-6 col-end-7">Total</span>
                </div>
                {!!items && items.length ? (
                  items.map((item) => {
                    const formattedPrice = new Intl.NumberFormat('de-DE', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(item.price);
                    return (
                      <div key={item.id} className="grid grid-cols-6 gap-0.5 py-1 text-end text-xs">
                        <span className="col-start-1 col-end-3 text-start">{item.name}</span>
                        <span className="col-start-3 col-end-4 rounded-sm bg-[#F9F9F9] p-1">{formattedPrice}</span>
                        <span className="col-start-4 col-end-5 rounded-sm bg-[#F9F9F9] p-1">{item.unit}</span>
                        <span className="col-start-5 col-end-6 rounded-sm bg-[#F9F9F9] p-1">{item.vat} %</span>
                        <span className="col-start-6 col-end-7 rounded-sm bg-[#F9F9F9] p-1">
                          {formattedPrice} {currencySign}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="grid grid-cols-6 gap-0.5 py-1 text-end text-xs">
                    <span className="col-start-1 col-end-3 text-start"></span>
                    <span className="col-start-3 col-end-4 rounded-sm bg-[#F9F9F9] p-1">0</span>
                    <span className="col-start-4 col-end-5 rounded-sm bg-[#F9F9F9] p-1">0</span>
                    <span className="col-start-5 col-end-6 rounded-sm bg-[#F9F9F9] p-1">0</span>
                    <span className="col-start-6 col-end-7 rounded-sm bg-[#F9F9F9] p-1">0</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-8 text-dark-gray">
              <h3 className="text-base font-semibold text-dark-gray">Summary</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p>Retention</p>
                  <p className="text-foreground">-</p>
                </div>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-foreground">1.250,00{currencySign}</p>
                </div>
                <div className="flex justify-between">
                  <p>
                    VAT <span className="font-bold">(23%)</span>
                  </p>
                  <p className="text-foreground">287,50{currencySign}</p>
                </div>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p className="text-foreground">125,00{currencySign}</p>
                </div>
                <Separator />
              </div>

              <div className="flex justify-between font-semibold text-foreground">
                <p>Total</p>
                <p>1.537,50{currencySign}</p>
              </div>
              <div className="flex justify-between text-foreground">
                <p>VAT Exemption</p>
                <p className="text-foreground">{vatExemption}</p>
              </div>
            </div>
            {/* {purchaseOrder && (
              <p>
                <span className="font-semibold">Reference note: </span>
                <span>{purchaseOrder}</span>
              </p>
            )} */}
          </Card>
        </div>
        <div className="col-span-full xl:col-span-5">Company ABC</div>
      </div>
    </main>
  );
}
