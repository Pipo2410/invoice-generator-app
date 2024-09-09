'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AddInvoiceSection } from '@/components/form/add-items/add-invoice-section';
import { AdditionalOptions } from '@/components/form/additional-options';
import { ClientSelector } from '@/components/form/client/client-selector';
import { InvoiceSummary } from '@/components/form/invoice-summary';
import { VatArticleSelector } from '@/components/form/vat-article-selector';
import { PreviewArea } from '@/components/preview/preview-area';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { formDefaultValues } from '@/context/helpers';
import { FormType, formSchema } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { ConfirmInvoiceDialogContent } from '../form/confirm-invoice-dialog-content';
import { CustomDialog } from '../form/custom-dialog';
import { AddDateSection } from '../form/date/add-date-section';
import { InvoiceIssuedDialogContent } from '../form/invoice-issued-dialog-content';
import { Toaster } from '../ui/toaster';

type Props = {
  showPreview: boolean;
};

export const Content: React.FC<Props> = ({ showPreview }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { invoiceId } = useCreateInvoiceFormContext();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: invoiceId, ...formDefaultValues },
  });

  // TODO: Find even type
  const onSubmitHandler = (data: FormType, event: unknown) => {
    console.log(data);
    console.log(event);
    console.log('submitted');
    setOpenDialog(true);
  };

  const onError = (error: unknown) => {
    toast({
      description: 'This is an informative toast or section added to a page lorem ipsum dolor sit amet.',
      variant: 'destructive',
      title: 'Title',
      duration: 3000,
    });
  };

  console.log(`form.formState.errors${JSON.stringify(form.formState.errors)}`);

  return (
    <>
      <div className="grid grid-cols-12">
        {/* <div className="grid min-h-[calc(100vh-88px)] grid-cols-12"> */}
        <FormProvider {...form}>
          <div
            className={cn(showPreview ? 'col-span-full xl:col-span-7 xl:mr-[75px]' : 'col-span-full xl:col-span-10')}
          >
            <Form {...form}>
              <form
                id="create-invoice"
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(onSubmitHandler, onError)}
              >
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
              </form>
            </Form>
          </div>
          {showPreview && <PreviewArea />}

          {openDialog && (
            <CustomDialog>
              {submitted ? (
                <InvoiceIssuedDialogContent />
              ) : (
                <ConfirmInvoiceDialogContent setOpenDialog={setOpenDialog} setSubmitted={setSubmitted} />
              )}
            </CustomDialog>
          )}

          <Toaster />
        </FormProvider>
      </div>
    </>
  );
};
