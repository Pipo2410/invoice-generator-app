'use server';

import { Client, FormType } from '@/context/model';

export const sendCreateClientRequest = (client: Client) => {
  console.log('server Action');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };
  const data = fetch(`http://localhost:3000/api/clients/create`, requestOptions).then((response) => response.json());

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
  const data = fetch(`http://localhost:3000/api/invoices`, requestOptions).then((response) => response.json());

  console.log('response inside server action: ', data);

  return data;
};
