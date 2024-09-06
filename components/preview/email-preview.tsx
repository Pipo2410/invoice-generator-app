import { PlusIcon } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export const EmailPreview = () => (
  <Card className="flex w-full flex-col gap-4 px-4 pb-24 pt-6">
    <CardHeader className="gap-2 space-y-0 p-2">
      <div className="flex h-10 items-center justify-between border-b">
        <p className="font-semibold">
          Sending to:
          <span className="ml-4 text-[13px] font-normal">company.abc@email.com</span>
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
          <span className="ml-4 text-[13px] font-normal">Jon Doe - Invoice #000, Due date on dd/mm/yyyy</span>
        </p>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 p-4">
      <div className="flex flex-col rounded-md p-4">
        <p>Hi [client name],</p>
        <br />
        <p>Thank your for your business.</p>
        <br />
        <p>Here is your invoice [####] in the amount of [2.352,37€].</p>
        <br />
        <p>Please pay the invoice using the reference code bellow: [referencecode]</p>
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
