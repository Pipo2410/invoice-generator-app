import { PlusIcon } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate, formatPrice } from '@/context/helpers';
import { FormType } from '@/context/model';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

type Props = {
  form: UseFormReturn<FormType>;
};

export const EmailPreview: React.FC<Props> = ({ form }) => {
  const client = form.watch('client');
  const price = form.watch('price.total');
  const dueDate = form.getValues('date.dueDate');
  const invoiceId = form.getValues('invoiceId');

  return (
    <Card className="flex w-full flex-col gap-4 px-4 pb-24 pt-6">
      <CardHeader className="gap-2 space-y-0 p-2">
        <div className="flex h-10 items-center justify-between border-b">
          <p className="font-semibold">
            Sending to:
            <span className="ml-4 text-[13px] font-normal">{client.email || 'Client Email'}</span>
          </p>
          <Button
            type="button"
            size="icon"
            className="h-fit w-fit gap-1 bg-transparent px-1 py-2 text-dark-blue hover:bg-transparent"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="text-xs">Cc</span>
          </Button>
        </div>
        <div className="flex h-10 items-center border-b">
          <p className="font-semibold">
            Subject:
            <span className="ml-4 text-[13px] font-normal">
              Jon Doe - Invoice #{invoiceId}, Due date on {dueDate ? formatDate(dueDate) : '[Date]'}
            </span>
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col rounded-md p-4">
          <p>Hi {client.businessName || '[client]'},</p>
          <br />
          <p>Thank your for your business.</p>
          <br />
          <p>
            Here is your invoice <span className="font-semibold">#{invoiceId}</span> in the amount of&nbsp;
            <span className="font-semibold">{formatPrice(price, client.currency.value)}.</span>
          </p>
          <br />
          <p>
            Please pay the invoice using the reference code bellow:{' '}
            {form.getValues('additionalOptions.referenceNote') || '[reference note]'}
          </p>
        </div>
        <Textarea placeholder="Add a custom note here" />
        <div className="flex flex-col rounded-md p-4">
          <p>If you have any questions, please contact jondoe@email.com.</p>
          <br />
          <p>Thank you,</p>
          <br />
          <p>Jon Doe</p>
        </div>
      </CardContent>
    </Card>
  );
};
