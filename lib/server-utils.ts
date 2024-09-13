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
export const updateClientRequest = async (client: Client) => {
  console.log('server Action');
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };
  const response = await fetch(`${process.env.API_PATH}/api/clients`, requestOptions);
  const data = response.json();
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
  const data = await fetch(`${process.env.API_PATH}/api/invoices`, requestOptions).then((response) => response.json());
  revalidatePath('/', 'layout');

  console.log('response inside server action: ', data);

  return data;
};

export const sendUpdateInvoiceRequest = async (property: string, value: string, id: number) => {
  const propertyToBeChanged = {
    [property]: value,
  };

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(propertyToBeChanged),
  };

  const response = await fetch(`${process.env.API_PATH}/api/invoices/${id}`, requestOptions);
  const data = response.json();
  revalidatePath('/', 'layout');
  return data;
};
