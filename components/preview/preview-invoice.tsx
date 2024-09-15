import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { InvoiceSummary } from '@/components/form/invoice-summary';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatPrice } from '@/context/helpers';
import { Date, FormType } from '@/context/model';
import { useCalculatePrice } from '@/hooks/use-calculate-price';

type Props = {
  form: UseFormReturn<FormType>;
};

export const PreviewInvoice: React.FC<Props> = ({ form }) => {
  const { getValues, control } = form;

  const client = useWatch({ control, name: 'client' });
  const purchaseOrder = useWatch({ control, name: 'additionalOptions.purchaseOrder' });
  const referenceNote = useWatch({ control, name: 'additionalOptions.referenceNote' });

  const currency = getValues('currency');
  const dueDate: Date['dueDate'] = getValues('date.dueDate');

  const { updatedItems } = useCalculatePrice();

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
            {dueDate && <p className="font-semibold">{formatDate(dueDate)}</p>}
          </div>
          <Separator orientation="vertical" className="mx-5 h-auto" />
          <div className="flex flex-col items-center">
            <p>Note or PO</p>
            <p className="font-semibold">{referenceNote}</p>
          </div>
        </div>
      </div>
      {/* ITEM SECTION */}
      <div className="flex flex-col gap-8 py-4">
        <p className="text-sm font-semibold text-light-gray">Item</p>
        <div className="flex flex-col gap-2">
          {/* Table Header */}
          <table className="w-full table-auto border-separate border-spacing-2 text-xs">
            <thead className="font-semibold text-light-gray">
              <tr>
                <th className="w-[40%]"></th>
                <th>Unit price</th>
                <th>Units</th>
                <th>VAT</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {!!updatedItems && updatedItems.length ? (
                updatedItems.map((item) => {
                  const formattedPrice = new Intl.NumberFormat('de-DE', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.price);

                  return (
                    <tr key={item.id} className="rounded-sm p-1 text-center text-foreground">
                      <td className="rounded-none text-start">{item.name}</td>
                      <td className="bg-background">{formattedPrice}</td>
                      <td className="bg-background">{item.unit}</td>
                      <td className="bg-background">{item.vat} %</td>
                      <td className="bg-background">{formatPrice(item.totalPrice, currency.value)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="rounded-sm p-1 text-center text-foreground">
                  <td></td>
                  <td className="bg-background">0</td>
                  <td className="bg-background">0</td>
                  <td className="bg-background">0</td>
                  <td className="bg-background">0</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* END ITEM SECTION */}
      <InvoiceSummary form={form} />
      {purchaseOrder && (
        <p>
          <span className="font-semibold">Reference note: </span>
          <span>{purchaseOrder}</span>
        </p>
      )}
    </Card>
  );
};
