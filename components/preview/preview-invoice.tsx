import { format } from 'date-fns';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { currencies } from '@/assets/currencies';
import { InvoiceSummary } from '@/components/form/invoice-summary';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Client, Date, Item } from '@/context/model';

export const PreviewInvoice = () => {
  const { getValues } = useFormContext();
  const client: Client = useWatch({ name: 'client' });
  const items: Item[] = useWatch({
    name: 'items',
  });

  const purchaseOrder = useWatch({
    name: 'additionalOptions.purchaseOrder',
  });
  const referenceNote = useWatch({
    name: 'additionalOptions.referenceNote',
  });

  const currency = getValues('currency');
  const dueDate: Date['dueDate'] = getValues('date.dueDate');

  const currencySign = currencies.find((el) => el.label === currency)?.sign;

  return (
    <Card className="flex w-full flex-col gap-4 rounded-2xl px-4 pb-8 pt-6">
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
            {dueDate && <p className="font-semibold">{format(dueDate, 'MMM d, yyyy')}</p>}
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
                  <span className="col-start-3 col-end-4 rounded-sm bg-background p-1">{formattedPrice}</span>
                  <span className="col-start-4 col-end-5 rounded-sm bg-background p-1">{item.unit}</span>
                  <span className="col-start-5 col-end-6 rounded-sm bg-background p-1">{item.vat} %</span>
                  <span className="col-start-6 col-end-7 rounded-sm bg-background p-1">
                    {formattedPrice} {currencySign}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="grid grid-cols-6 gap-0.5 py-1 text-end text-xs">
              <span className="col-start-1 col-end-3 text-start"></span>
              <span className="col-start-3 col-end-4 rounded-sm bg-background p-1">0</span>
              <span className="col-start-4 col-end-5 rounded-sm bg-background p-1">0</span>
              <span className="col-start-5 col-end-6 rounded-sm bg-background p-1">0</span>
              <span className="col-start-6 col-end-7 rounded-sm bg-background p-1">0</span>
            </div>
          )}
        </div>
      </div>
      <InvoiceSummary />
      {purchaseOrder && (
        <p>
          <span className="font-semibold">Reference note: </span>
          <span>{purchaseOrder}</span>
        </p>
      )}
    </Card>
  );
};
