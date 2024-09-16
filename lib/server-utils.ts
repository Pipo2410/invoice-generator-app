'use server';

import { revalidatePath } from 'next/cache';

import { Client, FormType } from '@/context/model';

export const sendCreateClientRequest = async (client: Client) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };
  const response = await fetch(`${process.env.API_PATH}/api/clients/create`, requestOptions);

  if (!response.ok) {
    throw new Error('Error while creating a client');
  }
  revalidatePath('/', 'layout');
  return await response.json();
};

export const updateClientRequest = async (client: Client) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };
  const response = await fetch(`${process.env.API_PATH}/api/clients`, requestOptions);
  if (!response.ok) {
    throw new Error('Error while updating the client');
  }
  revalidatePath('/', 'layout');
  return response.json();
};

export const sendCreateInvoiceRequest = async (invoice: FormType) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoice),
  };
  const response = await fetch(`${process.env.API_PATH}/api/invoices`, requestOptions);
  if (!response.ok) {
    throw new Error('Error while updating the client');
  }
  revalidatePath('/', 'layout');
  return response.json();
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
  revalidatePath('/', 'layout');
  return response.json();
};
