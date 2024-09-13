import { format } from 'date-fns';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { statusVariantMap } from '@/context/helpers';
import { AppConfig, IssuedInvoice } from '@/context/model';

type Props = {
  invoice: IssuedInvoice;
  appConfig: AppConfig;
};

export const InvoicePreview: React.FC<Props> = ({ invoice, appConfig }) => {
  const { client, items } = invoice;
  const currencySign = appConfig.currencies.find((cur) => cur.value === invoice.currency.value)?.sign;

  const referenceNote = invoice.additionalOptions.referenceNote;
  const variant = statusVariantMap[invoice.status];

  return (
    <Card className="flex w-full flex-col gap-4 rounded-2xl border-none p-8">
      <div className="header flex flex-col gap-6 p-2">
        <div className="text-right">
          <Badge variant={variant} className="mb-2 inline-block px-2.5 py-1.5 font-normal capitalize">
            {invoice.status}
          </Badge>
          <p className="text-xs text-dark-gray">Issued on {format(invoice.date.issueDate, 'd MMM yyyy')}</p>
        </div>
        <h3 className="text-3xl font-semibold">Invoice</h3>
        <div className="flex flex-col gap-0.5 py-2 text-xs">
          <h5 className="text-base font-semibold">Billed to</h5>
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
        <div className="flex justify-center border-b border-t border-dashed py-4 text-sm text-dark-gray">
          <div className="flex flex-col">
            <p>Number</p>
            <p className="font-semibold">{referenceNote}</p>
          </div>
          <Separator orientation="vertical" className="mx-5 h-auto" />
          <div className="flex flex-col">
            <p>Due date</p>
            <p className="font-semibold">{format(invoice.date.dueDate, 'MMM d, yyyy')}</p>
          </div>
          <Separator orientation="vertical" className="mx-5 h-auto" />
          <div className="flex flex-col">
            <p>Note or PO</p>
            <p className="font-semibold">{referenceNote}</p>
          </div>
        </div>
      </div>
      {/* ITEM SECTION */}
      <div className="flex flex-col gap-8 border-b border-dashed py-4">
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
              {items.map((item) => {
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
                    <td className="bg-background">
                      {formattedPrice} {currencySign}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* END ITEM SECTION */}
      <p className="text-sm">
        <span className="font-semibold">Description:</span>
        <span>It includes brand guide lines and UI kit</span>
      </p>

      {/* FOOTER / SUMMARY */}
      <div className="flex flex-col gap-4 text-sm text-dark-gray">
        <div>
          <h3 className="mb-2 mt-8 text-sm font-semibold text-dark-gray">Summary</h3>
        </div>
        <div className="flex flex-col gap-4 border-b border-dashed">
          <div className="flex justify-between">
            <p>Retention</p>
            <p className="font-semibold text-foreground">-</p>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-semibold text-foreground">1.250,00{currencySign}</p>
          </div>
          <div className="flex justify-between">
            <p>
              VAT <span className="font-bold">(23%)</span>
            </p>
            <p className="font-semibold text-foreground">287,50{currencySign}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p>Discount</p>
            <p className="font-semibold text-foreground">125,00{currencySign}</p>
          </div>
        </div>

        <div className="flex justify-between text-base font-semibold text-foreground">
          <p>Total</p>
          <p>1.537,50{currencySign}</p>
        </div>
        <div className="flex justify-between text-xs text-foreground">
          <p>VAT Exemption</p>
          <p className="text-foreground">{invoice.vatExemption.label}</p>
        </div>
      </div>
    </Card>
  );
};
