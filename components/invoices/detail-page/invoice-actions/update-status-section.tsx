'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { IssuedInvoice } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
import { sendUpdateInvoiceRequest } from '@/lib/server-utils';

export const UpdateStatusSection = ({ invoice }: { invoice: IssuedInvoice }) => {
  const [invoiceStatus, setInvoiceStatus] = useState(invoice.status);
  const { toast } = useToast();
  const markAsPaidHandler = async () => {
    console.log('sending request');

    const response = await sendUpdateInvoiceRequest('status', 'paid', invoice.invoiceId);
    setInvoiceStatus(response.status);
    toast({
      title: response.error ? 'Erorr' : 'Success',
      variant: response.error ? 'destructive' : 'success',
      description: response.error ? response.error : 'Invoice updated',
    });
  };

  return (
    <Button
      onClick={markAsPaidHandler}
      disabled={invoiceStatus === 'paid'}
      className="mt-64 min-h-14 rounded-full font-semibold"
    >
      Mark as paid
    </Button>
  );
};
