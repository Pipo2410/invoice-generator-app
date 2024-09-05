'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { AddInvoiceSection } from '@/components/form/add-items/add-invoice-section';
import { AdditionalOptions } from '@/components/form/additional-options';
import { ClientSelector } from '@/components/form/client/client-selector';
import { CurrencySelector } from '@/components/form/currency-selector';
import { InvoiceSummary } from '@/components/form/invoice-summary';
import { VatArticleSelector } from '@/components/form/vat-article-selector';
import { ActionBar } from '@/components/layout/action-bar';
import { PreviewArea } from '@/components/preview/preview-area';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { formDefaultValues } from '@/context/helpers';
import { formSchema } from '@/context/model';
import { cn } from '@/lib/utils';

import { AddDateSection } from '../form/date/add-date-section';

export type FormType = z.infer<typeof formSchema>;

type Props = {
  showPreview: boolean;
};

export const Content: React.FC<Props> = ({ showPreview }) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmitHandler = (values: FormType) => {};

  return (
    <>
      <div className="grid grid-cols-12">
        {/* <div className="grid min-h-[calc(100vh-88px)] grid-cols-12"> */}
        <FormProvider {...form}>
          <div
            className={cn(showPreview ? 'col-span-full xl:col-span-7 xl:mr-[75px]' : 'col-span-full xl:col-span-10')}
          >
            <Form {...form}>
              <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmitHandler)}>
                <CurrencySelector form={form} />
                <ClientSelector form={form} />
                <div className="flex flex-col gap-4">
                  <AddDateSection form={form} />
                  <VatArticleSelector form={form} />
                </div>
                <div>
                  <Separator />
                  <AddInvoiceSection form={form} />
                  <AdditionalOptions form={form} />
                </div>
                <div className="summary">
                  <InvoiceSummary />
                </div>
              </form>
            </Form>
          </div>
          {showPreview && <PreviewArea />}
        </FormProvider>
      </div>
    </>
  );
};
