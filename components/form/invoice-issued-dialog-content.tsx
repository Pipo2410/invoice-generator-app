import { Check, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FormType } from '@/context/model';

import { EmailPreview } from '../preview/email-preview';
import { CustomCheckbox } from './custom-checkbox';
import { CustomDialogFooter } from './custom-dialog';

type Props = {
  form: UseFormReturn<FormType>;
};

export const InvoiceIssuedDialogContent: React.FC<Props> = ({ form }) => {
  const router = useRouter();
  const invoiceId = form.getValues('invoiceId');
  return (
    <>
      <AlertDialogHeader className="flex flex-col items-center">
        <div className="flex items-center justify-center rounded-full bg-[#27A251] p-4 text-white">
          <Check />
        </div>
        <div className="flex flex-col items-center gap-6">
          <AlertDialogTitle>
            Invoice <span className="font-semibold">{invoiceId}</span> issued
          </AlertDialogTitle>
          <AlertDialogDescription className="center text-center">
            Send the invoice to your client and we will track it to ensure you are paid on time.
          </AlertDialogDescription>
          <CustomCheckbox text="Send invoice in Portuguese" id="invoice-portuguese" />
        </div>
        <div className="max-h-96 overflow-scroll">
          <EmailPreview form={form} />
        </div>
      </AlertDialogHeader>
      <CustomDialogFooter
        cancelText="Not now"
        actionText="Send invoice"
        icon={<Send className="ml-2" />}
        onCancel={() => router.push(`/invoices/${form.getValues('invoiceId')}`)}
        onAction={() => router.push(`/invoices/${form.getValues('invoiceId')}`)}
      />
    </>
  );
};
