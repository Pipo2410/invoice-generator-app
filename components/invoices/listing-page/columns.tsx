'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatPrice, statusVariantMap } from '@/context/helpers';
import { Client, IssuedInvoice, Price } from '@/context/model';

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
    accessorKey: 'clientName',
    accessorFn: ({ client }) => client.businessName,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Client
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const companyName: Client['businessName'] = row.getValue('clientName');
      const avaratName = companyName.split(' ').reduce((acc, word) => acc + word[0], '');
      return (
        <div className="flex items-center gap-1 text-base font-semibold capitalize">
          <Avatar>
            <AvatarFallback>{avaratName}</AvatarFallback>
          </Avatar>
          {companyName}
        </div>
      );
    },
  },
  {
    accessorKey: 'issueDate',
    accessorFn: ({ date }) => date.issueDate,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Issue Date
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const issueDate: Date = row.getValue('issueDate');
      const formattedDate = formatDate(issueDate);
      return <div className="text-xs capitalize text-dark-gray">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Due date
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: ({ date }) => date.dueDate,
    cell: ({ row }) => {
      const dueDate: Date = row.getValue('dueDate');
      const formattedDate = formatDate(dueDate);
      return <div className="text-xs capitalize text-dark-gray">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'status',
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
    accessorKey: 'price',
    accessorFn: ({ price }) => price.total,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Amount
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price: Price['total'] = row.getValue('price');
      return <div className="text-base font-semibold capitalize text-dark-gray">{formatPrice(price, 'EUR')}</div>;
    },
  },
];
