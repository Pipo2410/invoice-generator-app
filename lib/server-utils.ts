'use server';

import { revalidatePath } from 'next/cache';

import { Client, FormType } from '@/context/model';

export const sendCreateClientRequest = (client: Client) => {
  console.log('server Action');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };
  const data = fetch(`${process.env.API_PATH}/api/clients/create`, requestOptions).then((response) => response.json());
  revalidatePath('/', 'layout');

  return data;
};

export const sendCreateInvoiceRequest = async (invoice: FormType) => {
  console.log('server Action');
  console.log(invoice);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoice),
  };
  const data = fetch(`${process.env.API_PATH}/api/invoices`, requestOptions).then((response) => response.json());
  revalidatePath('/', 'layout');

  console.log('response inside server action: ', data);

  return data;
};
