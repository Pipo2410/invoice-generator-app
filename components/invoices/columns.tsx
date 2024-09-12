'use client';

import { ColumnDef } from '@tanstack/react-table';

import { FormType, IssuedInvoice } from '@/context/model';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<IssuedInvoice>[] = [
  {
    accessorKey: 'id',
    header: 'Document',
  },
  {
    accessorKey: 'client.businessName',
    header: 'Client',
  },
  {
    accessorKey: 'date.issueDate',
    header: 'IssueDate',
  },
  {
    accessorKey: 'date.dueDate',
    header: 'Due date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'price.value',
    header: 'Amount',
  },
];
