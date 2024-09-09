'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Send } from 'lucide-react';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AddInvoiceSection } from '@/components/form/add-items/add-invoice-section';
import { AdditionalOptions } from '@/components/form/additional-options';
import { ClientSelector } from '@/components/form/client/client-selector';
import { InvoiceSummary } from '@/components/form/invoice-summary';
import { VatArticleSelector } from '@/components/form/vat-article-selector';
import { PreviewArea } from '@/components/preview/preview-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { formDefaultValues } from '@/context/helpers';
import { FormType, formSchema } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
import { sendCreateInvoiceRequest } from '@/lib/server-utils';
import { cn } from '@/lib/utils';

import { CustomCheckbox } from '../form/custom-checkbox';
import { AddDateSection } from '../form/date/add-date-section';
import { IconComponent } from '../navigation/icon-component';
import { EmailPreview } from '../preview/email-preview';
import { Toaster } from '../ui/toaster';

type Props = {
  showPreview: boolean;
};

export const Content: React.FC<Props> = ({ showPreview }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { invoiceId } = useCreateInvoiceFormContext();

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
    console.log(error);
    // trigger toast error message
    toast({
      description: 'This is an informative toast or section added to a page lorem ipsum dolor sit amet.',
      variant: 'destructive',
      title: 'Title',
      duration: 3000,
    });
  };

  console.log('form.formState.errors');
  console.log(form.formState.errors);
  console.log('form.formState.errors');

  // const generateInvoiceHandler = () => {};

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
          <AlertDialog open={openDialog}>
            <AlertDialogContent className="max-h-[80vh]">
              {submitted ? (
                <>
                  <AlertDialogHeader className="flex flex-col items-center">
                    <div className="flex items-center justify-center rounded-full bg-[#27A251] p-4 text-white">
                      <Check />
                    </div>
                    <div className="flex flex-col items-center">
                      <AlertDialogTitle>Invoice #123 issued</AlertDialogTitle>
                      <AlertDialogDescription className="center text-center">
                        Send the invoice to your client and we will track it to ensure you are paid on time.
                      </AlertDialogDescription>
                      <CustomCheckbox text="Default currency for this client" id="currency" />
                    </div>
                    <div className="max-h-96 overflow-scroll">
                      <EmailPreview />
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="sm:justify-center sm:space-x-6">
                    <AlertDialogCancel
                      className="h-auto w-1/2 rounded-full border-2 border-black py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                      onClick={() => setOpenDialog(false)}
                    >
                      Not now
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => setOpenDialog(false)}
                      className="h-auto w-1/2 rounded-full border-2 border-black py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      Send invoice
                      <Send className="ml-2" />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              ) : (
                <>
                  <AlertDialogHeader className="m-6 flex flex-col items-center">
                    <div className="flex items-center justify-center rounded-full bg-light-blue p-4">
                      <IconComponent icon="FileTextCheck" className="h-10 w-10 fill-dark-blue" />
                    </div>
                    <AlertDialogTitle>Almost there!</AlertDialogTitle>
                    <AlertDialogDescription>Please ensure your invoice is reviewed and correct.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="sm:justify-center sm:space-x-6">
                    <AlertDialogCancel
                      onClick={() => setOpenDialog(false)}
                      className="h-auto w-1/2 rounded-full border-2 border-black py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      Continue editing
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        const response = await sendCreateInvoiceRequest(form.getValues());
                        console.log(response);
                        setSubmitted(true);
                      }}
                      className="h-auto w-1/2 rounded-full border-2 border-black py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      Issue invoice
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              )}
            </AlertDialogContent>
          </AlertDialog>
          <Toaster />
        </FormProvider>
      </div>
    </>
  );
};
