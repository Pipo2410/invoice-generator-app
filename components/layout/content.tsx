'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PreviewFormArea } from '@/components/preview/preview-form-area';
import { Form } from '@/components/ui/form';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { useDefaultContext } from '@/context/default-context';
import { formDefaultValues } from '@/context/helpers';
import { FormType, formSchema } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
    defaultValues: { id: invoiceId, ...formDefaultValues },
  });

  // TODO: Find even type
  const onSubmitHandler = (data: FormType, event: unknown) => {
    setOpenConfirmationDialog(true);
    console.log(data);
    console.log(event);
    console.log('submitted');
  };

  const onError = () => {
    toast({
      description: 'Please fill in all necessary information',
      variant: 'destructive',
      title: 'Title',
      duration: 30000,
    });
  };

  const toggleLayoutClasses = useMemo(
    () => cn(showPreview ? 'col-span-full xl:col-span-7 xl:mr-[75px]' : 'col-span-full xl:col-span-10'),
    [showPreview],
  );

  const ConfirmSubmitDialogComponent = useMemo(() => {
    console.log('halo from memo');
    return (
      <CustomDialog open={openConfirmationDialog}>
        {submitted ? (
          <InvoiceIssuedDialogContent />
        ) : (
          <ConfirmInvoiceDialogContent setOpenDialog={setOpenConfirmationDialog} setSubmitted={setSubmitted} />
        )}
      </CustomDialog>
    );
  }, [submitted, openConfirmationDialog]);

  console.log('form');
  console.log(submitted);
  // console.log(form.formState);
  // console.log(form.getValues());
  // console.log('form');
  // console.log(`form.formState.errors${JSON.stringify(form.formState.errors)}`);

  return (
    <div className="grid grid-cols-12">
      <FormProvider {...form}>
        <div className={toggleLayoutClasses}>
          <Form {...form}>
            <form
              id="create-invoice"
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmitHandler, onError)}
            >
              <FormContent form={form} />
            </form>
          </Form>
        </div>
        {showPreview && <PreviewFormArea />}
        {ConfirmSubmitDialogComponent}
        <Toaster />
      </FormProvider>
    </div>
  );
};
