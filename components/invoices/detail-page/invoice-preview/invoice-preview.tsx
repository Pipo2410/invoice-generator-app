import { format } from 'date-fns';
import React from 'react';

import { InvoicePreviewClientInfo } from '@/components/preview/invoice-preview-client-info';
import { InvoicePreviewItemsTable } from '@/components/preview/invoice-preview-items-table';
import { InvoicePreviewLineSection } from '@/components/preview/invoice-preview-line-section';
import { InvoiceSummarySection } from '@/components/preview/invoice-summary-section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate, formatPrice, statusVariantMap } from '@/context/helpers';
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
        <InvoicePreviewClientInfo client={client} />
        <InvoicePreviewLineSection
          sections={[
            {
              label: 'Number',
              value: `#${invoice.invoiceId}`,
            },
            {
              label: 'Due date',
              value: formatDate(invoice.date.dueDate),
            },
            {
              label: 'Note or PO',
              value: referenceNote,
            },
          ]}
          classes="-mx-1"
        />
      </div>

      <InvoicePreviewItemsTable items={items} currency={invoice.currency} wrapperClasses="border-b border-dashed" />

      <p className="text-sm">
        <span className="font-semibold">Description:</span>
        <span>It includes brand guide lines and UI kit</span>
      </p>

      <InvoiceSummarySection
        title="Summary"
        items={[
          {
            label: 'Retention',
            value: invoice.price.retentionAmount
              ? formatPrice(invoice.price.retentionAmount, invoice.currency.value)
              : '-',
          },
          {
            label: 'Subtotal',
            value: formatPrice(invoice.price.subTotal, invoice.currency.value) + currencySign,
          },
          {
            label: 'VAT',
            value: formatPrice(invoice.price.vatTotal, invoice.currency.value),
          },
          {
            label: 'Discount',
            value: formatPrice(invoice.price.discountTotal, invoice.currency.value),
          },
        ]}
        totalLabel="Total"
        totalValue={formatPrice(invoice.price.total, invoice.currency.value)}
        vatExemptionLabel="VAT Exemption"
        vatExemptionValue={invoice.vatExemption.label}
      />
    </Card>
  );
};
