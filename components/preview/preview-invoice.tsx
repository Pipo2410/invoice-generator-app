import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { InvoiceSummary } from '@/components/form/invoice-summary';
import { Card } from '@/components/ui/card';
import { useCalculatePrice } from '@/hooks/use-calculate-price';
import { formatDate } from '@/utils/helpers';
import { Date, FormType } from '@/utils/model';

import { InvoicePreviewClientInfo } from './invoice-preview-client-info';
import { InvoicePreviewItemsTable } from './invoice-preview-items-table';
import { InvoicePreviewLineSection } from './invoice-preview-line-section';

type Props = {
  form: UseFormReturn<FormType>;
};

export const PreviewInvoice: React.FC<Props> = ({ form }) => {
  const { getValues, control } = form;

  const client = useWatch({ control, name: 'client' });
  const invoiceId = form.getValues('invoiceId');
  const purchaseOrder = useWatch({ control, name: 'additionalOptions.purchaseOrder' });
  const referenceNote = useWatch({ control, name: 'additionalOptions.referenceNote' });

  const currency = getValues('currency');
  const dueDate: Date['dueDate'] = getValues('date.dueDate');

  const { updatedItems } = useCalculatePrice();

  return (
    <Card className="flex w-full flex-col gap-4 rounded-2xl px-4 pb-8 pt-6">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">Invoice</h3>
          <h4 className="text-xs font-semibold text-dark-gray">#{invoiceId}</h4>
        </div>
        <InvoicePreviewClientInfo client={client} />
        <InvoicePreviewLineSection
          sections={[
            { label: 'Due date', value: dueDate ? formatDate(dueDate) : '' },
            {
              label: 'Note or PO',
              value: purchaseOrder,
            },
          ]}
          classes="-mx-1"
          align="center"
        />
      </div>
      <InvoicePreviewItemsTable items={updatedItems} currency={currency} wrapperClasses="border-b border-dashed" />

      <InvoiceSummary form={form} />
      {referenceNote && (
        <p className="text-center text-dark-gray">
          <span className="font-semibold">Reference note: </span>
          <span>{referenceNote}</span>
        </p>
      )}
    </Card>
  );
};
