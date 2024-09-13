'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { statusVariantMap } from '@/context/helpers';
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
        <p className="font-semibold">{row.getValue('invoiceId')}#</p>
        <p className="text-dark-gray">invoice</p>
      </div>
    ),
  },
  {
    accessorKey: 'clientName', // Accessing nested field
    accessorFn: ({ client }) => client.businessName,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Client
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-semibold capitalize">{row.getValue('clientName')}</div>,
  },
  {
    accessorKey: 'issueDate', // Accessing nested field
    accessorFn: ({ date }) => date.issueDate,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Issue Date
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const issueDate: Date = row.getValue('issueDate');
      const formattedDate = format(issueDate, 'MMM d, yyyy');
      return <div className="text-xs capitalize text-dark-gray">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'dueDate', // Accessing nested field
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Due date
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: ({ date }) => date.dueDate,
    cell: ({ row }) => {
      const dueDate: Date = row.getValue('dueDate');
      const formattedDate = format(dueDate, 'MMM d, yyyy');
      return <div className="text-xs capitalize text-dark-gray">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'status', // Accessing nested field
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Status
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status: IssuedInvoice['status'] = row.getValue('status');

      const variant = statusVariantMap[status];

      return (
        <Badge variant={variant} className="font-normal capitalize">
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
