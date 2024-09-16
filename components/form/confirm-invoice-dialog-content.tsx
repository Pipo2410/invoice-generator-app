import React, { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

import { AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FormType } from '@/context/model';
import { useCalculatePrice } from '@/hooks/use-calculate-price';
import { useToast } from '@/hooks/use-toast';
import { sendCreateInvoiceRequest } from '@/lib/server-utils';

import { IconComponent } from '../navigation/icon-component';
import { CustomDialogFooter } from './custom-dialog';

type Props = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
};

export const ConfirmInvoiceDialogContent: React.FC<Props> = ({ setOpenDialog, setSubmitted }) => {
  const { getValues } = useFormContext<FormType>();
  const formValues = getValues();
  const { toast } = useToast();

  const { updatedItems } = useCalculatePrice();

  const dataToBeSubmitted = {
    ...formValues,
    items: updatedItems,
  };

  const handleIssueInvoice = async () => {
    try {
      await sendCreateInvoiceRequest(dataToBeSubmitted);
    } catch (error) {
      toast({
        title: 'Erorr',
        variant: 'destructive',
        description: 'Invoice updated',
        duration: 3000,
      });
      return;
    }
    setSubmitted(true);
  };
  return (
    <>
      <AlertDialogHeader className="m-6 flex flex-col items-center">
        <div className="flex items-center justify-center rounded-full bg-light-blue p-4">
          <IconComponent icon="FileTextCheck" className="h-10 w-10 fill-dark-blue" />
        </div>
        <AlertDialogTitle>Almost there!</AlertDialogTitle>
        <AlertDialogDescription>Please ensure your invoice is reviewed and correct.</AlertDialogDescription>
      </AlertDialogHeader>
      <CustomDialogFooter
        cancelText="Continue editing"
        actionText="Issue invoice"
        onCancel={() => setOpenDialog(false)}
        onAction={handleIssueInvoice}
      />
    </>
  );
};
