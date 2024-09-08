'use server';

import { Client } from '@/context/model';

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
