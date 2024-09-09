import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AddInvoiceSection } from '@/components/form/add-items/add-invoice-section';
import { AdditionalOptions } from '@/components/form/additional-options';
import { ClientSelector } from '@/components/form/client/client-selector';
import { AddDateSection } from '@/components/form/date/add-date-section';
import { InvoiceSummary } from '@/components/form/invoice-summary';
import { VatArticleSelector } from '@/components/form/vat-article-selector';
import { Separator } from '@/components/ui/separator';
import { FormType } from '@/context/model';

type Props = {
  form: UseFormReturn<FormType>;
};

export const FormContent: React.FC<Props> = ({ form }) => (
  <>
    <ClientSelector />
    <div className="flex flex-col gap-4">
      <AddDateSection form={form} />
      <VatArticleSelector form={form} />
    </div>
    <div>
      <Separator />
      <AddInvoiceSection />
      <AdditionalOptions form={form} />
    </div>
    <div className="summary">
      <InvoiceSummary />
    </div>
  </>
);
