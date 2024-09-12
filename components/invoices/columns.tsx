'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { IssuedInvoice } from '@/context/model';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const columns: ColumnDef<IssuedInvoice>[] = [
  {
    accessorKey: 'invoiceId',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Document
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col justify-center">
        <p>{row.getValue('invoiceId')}#</p>
        <p className="text-dark-gray">invoice</p>
      </div>
    ),
  },
  {
    accessorKey: 'clientName', // Accessing nested field
    accessorFn: ({ client }) => client.businessName,
    header: 'Client',
    cell: ({ row }) => <div className="capitalize">{row.getValue('clientName')}</div>,
  },
  {
    accessorKey: 'issueDate', // Accessing nested field
    accessorFn: ({ date }) => date.issueDate,
    header: 'Issue Date',
    cell: ({ row }) => {
      const issueDate: Date = row.getValue('issueDate');
      const formattedDate = format(issueDate, 'PPP');
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'dueDate', // Accessing nested field
    header: 'Due date',
    accessorFn: ({ date }) => date.dueDate,
    cell: ({ row }) => {
      const dueDate: Date = row.getValue('dueDate');
      const formattedDate = format(dueDate, 'PPP');
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'status', // Accessing nested field
    header: 'Status',
    cell: ({ row }) => {
      const status: IssuedInvoice['status'] = row.getValue('status');

      const statusVariantMap: Record<IssuedInvoice['status'], 'warning' | 'success' | 'destructive' | 'outline'> = {
        draft: 'warning',
        paid: 'success',
        overdue: 'destructive',
        issued: 'outline', // issued as the default or neutral state
      };

      const variant = statusVariantMap[status];

      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'amount', // Accessing nested field
    header: 'Amount',
  },
];
