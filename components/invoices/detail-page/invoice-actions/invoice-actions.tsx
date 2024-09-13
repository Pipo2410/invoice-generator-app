import { format } from 'date-fns';
import { ArrowDownToLine, CopyPlus, FilePlus, Send } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { statusVariantMap } from '@/context/helpers';
import { IssuedInvoice } from '@/context/model';

import { IconButton } from './icon-button';
import { UpdateStatusSection } from './update-status-section';

type Props = {
  invoice: IssuedInvoice;
};

export const formatDate = (date: Date) => format(date, 'MMM d, yyyy');

export const InvoiceActions: React.FC<Props> = ({ invoice }) => {
  const variant = statusVariantMap[invoice.status];

  return (
    <Card className="flex w-full flex-col gap-4 rounded-2xl border-none px-8 pb-16 pt-6">
      <div className="header flex flex-col gap-6 p-2">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{invoice.client.businessName}</h3>
            <Badge variant={variant} className="px-2.5 py-1.5 font-normal capitalize">
              {invoice.status}
            </Badge>
          </div>
          <div className="flex justify-between">
            <IconButton text="Send">
              <Send className="text-dark-blue" />
            </IconButton>
            <IconButton text="PDF">
              <ArrowDownToLine className="text-dark-blue" />
            </IconButton>
            <IconButton text="Duplicate">
              <CopyPlus className="text-dark-blue" />
            </IconButton>
            <IconButton text="Credit note">
              <FilePlus className="text-dark-blue" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 rounded-2xl border px-4 py-6">
            <p>
              Invoice <span className="font-semibold">#{invoice.invoiceId}</span>
            </p>
            <p>
              Issued on <span className="font-semibold">{formatDate(invoice.date.issueDate)}</span>
            </p>
            <p>
              Due on <span className="font-semibold">{formatDate(invoice.date.dueDate)}</span>
            </p>
            <p>
              {invoice.items.length > 1 ? 'Items' : 'Item'}&nbsp;
              <span className="font-semibold">{invoice.items.map((item) => item.name).join(', ')}</span>
            </p>
            <p>
              Units <span className="font-semibold">{invoice.items.length}</span>
            </p>
            <p>
              Total amount <span className="font-semibold">{'invoice.price'}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border p-4">
            <h6 className="text-sm text-dark-gray">History</h6>
            <p className="flex justify-between px-4">
              <span>Invoice sent</span>
              {/* TODO: MISSING DATA, SEND TO API WHEN CLICKS SEND AFTER ISSUEING INVOICE */}
              <span className="text-dark-gray">{formatDate(invoice.date.dueDate)}</span>
            </p>
          </div>
          <UpdateStatusSection invoice={invoice} />
        </div>
      </div>
    </Card>
  );
};
