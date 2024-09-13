import { Check, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

import { EmailPreview } from '../preview/email-preview';
import { CustomCheckbox } from './custom-checkbox';
import { CustomDialogFooter } from './custom-dialog';

export const InvoiceIssuedDialogContent = () => {
  const router = useRouter();
  const { getValues } = useFormContext();
  return (
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
      <CustomDialogFooter
        cancelText="Not now"
        actionText="Send invoice"
        icon={<Send className="ml-2" />}
        // test this?
        onCancel={() => router.push(`/invoices/${getValues('invoiceId')}`)}
        onAction={() => router.push(`/invoices/${getValues('invoiceId')}`)}
      />
    </>
  );
};
