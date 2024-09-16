'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PreviewFormArea } from '@/components/preview/preview-form-area';
import { Form } from '@/components/ui/form';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { useDefaultContext } from '@/context/default-context';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formDefaultValues } from '@/utils/helpers';
import { FormType, formSchema } from '@/utils/model';

import { ConfirmInvoiceDialogContent } from '../form/confirm-invoice-dialog-content';
import { CustomDialog } from '../form/custom-dialog';
import { FormContent } from '../form/form-content';
import { InvoiceIssuedDialogContent } from '../form/invoice-issued-dialog-content';
import { Toaster } from '../ui/toaster';

export const Content = () => {
  const { invoiceId } = useCreateInvoiceFormContext();
  const { showPreview } = useDefaultContext();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceId: invoiceId,
      ...formDefaultValues,
    },
  });

  const onSubmitHandler = () => {
    setOpenConfirmationDialog(true);
  };

  const onError = () => {
    toast({
      description: 'Please fill in all necessary information',
      variant: 'destructive',
      title: 'Title',
      duration: 3000,
    });
  };

  const toggleLayoutClasses = cn(
    showPreview ? 'col-span-full xl:col-span-7 xl:mr-[75px]' : 'col-span-full xl:col-span-10',
  );

  const confirmSubmitDialogComponent = useMemo(
    () => (
      <CustomDialog open={openConfirmationDialog}>
        {submitted ? (
          <InvoiceIssuedDialogContent form={form} />
        ) : (
          <ConfirmInvoiceDialogContent setOpenDialog={setOpenConfirmationDialog} setSubmitted={setSubmitted} />
        )}
      </CustomDialog>
    ),
    [submitted, openConfirmationDialog, form],
  );

  return (
    <div className="grid grid-cols-12">
      <Form {...form}>
        <div className={toggleLayoutClasses}>
          <form
            id="create-invoice"
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmitHandler, onError)}
          >
            <FormContent form={form} />
          </form>
        </div>
        {showPreview && <PreviewFormArea form={form} />}
        {confirmSubmitDialogComponent}
      </Form>
      <Toaster />
    </div>
  );
};
