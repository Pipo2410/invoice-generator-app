import React from 'react';

import { Client } from '@/context/model';

type Props = {
  client: Client;
};

export const InvoicePreviewClientInfo: React.FC<Props> = ({ client }) => (
  <div className="flex flex-col gap-0.5 py-2 text-xs">
    <h5 className="text-base font-semibold">Billed to</h5>
    <p className="flex justify-between text-dark-gray">
      <span>Business name</span>
      <span className="font-semibold">{client.businessName}</span>
    </p>
    <p className="flex justify-between text-dark-gray">
      <span>Business address</span>
      {client.address && <span>{client.address?.street}</span>}
    </p>
    <p className="flex justify-between text-dark-gray">
      <span>City, Country - 0000-000</span>
      {client.address && <span>{`${client.address?.city}, ${client.country} - ${client.address?.postalCode}`}</span>}
    </p>
    <p className="flex justify-between text-dark-gray">
      <span>NIF</span>
      <span>{client.nif}</span>
    </p>
  </div>
);
