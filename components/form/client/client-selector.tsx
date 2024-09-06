'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';

import { FormType } from '@/components/layout/content';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { Client } from '@/context/model';
import { sendCreateClientRequest } from '@/lib/server-utils';

import { AutoComplete } from '../autocomplete';
import { ClientCard } from './client-card';
import { CreateClient } from './create-client';

export const ClientSelector = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const { clients, setClients } = useCreateInvoiceFormContext();
  const { setValue, formState } = useFormContext();

  useEffect(() => {
    if (selectedValue === 'create-new') {
      setShowCreateUserForm(true);
      return;
    }
    // investigate this
    const selectedClient = clients.find(
      (client) => client.businessName === selectedValue || String(client.nif) === selectedValue,
    );
    if (selectedClient) {
      setValue('invoice.client', selectedClient);
    }
  }, [selectedValue, clients, setValue]);

  const errors: FieldErrors<FormType> = formState.errors;

  const newItems = clients.map((item) => ({
    label: item.businessName,
    value: String(item.nif),
  }));

  const filteredItems = newItems.filter(
    (client) =>
      client.value.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const cancelClientCreationHandler = () => {
    setSelectedValue('');
    setShowCreateUserForm(false);
  };

  const submitClientCreationHandler = async () => {
    const { clients }: { clients: Client[] } = await sendCreateClientRequest();
    setValue('invoice.client', {
      businessName: 'Netflix',
      email: 'netflix@gmail.com',
      nif: 389643090,
      country: 'Portugal',
      currency: 'EUR',
      defaultCurrency: 'EUR',
      address: {
        street: 'Avenida de liberdade 726',
        city: 'Lisboa',
        postalCode: '1254-223',
        additional: '1dt-1e',
      },
    });
    setShowCreateUserForm(false);
    setSelectedValue('389643090');
    setClients(clients);
  };

  return (
    <div>
      {!selectedValue && (
        <div className="flex flex-col gap-1">
          <AutoComplete
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            items={filteredItems ?? []}
            // Optional props
            emptyMessage="No items found."
            placeholder="Search or add a client..."
            searchWrapperClasses="bg-secondary"
            // inputClassNames="w-full h-fit py-5 justify-between text-base text-foreground font-normal placeholder:text-dark-gray placeholder:text-base border-none rounded-2xl"
            inputClassNames="h-fit text-base leading-4 border-none py-4 px-0 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
            iconClassName="mr-3 h-6 w-6"
            error={!!errors.invoice?.client}
            addOption={true}
          />
          <p className="ml-4 text-sm text-dark-gray">Client legal name or company NIF number</p>
        </div>
      )}

      {showCreateUserForm && (
        <CreateClient onCancel={cancelClientCreationHandler} onSubmit={submitClientCreationHandler} />
      )}

      {selectedValue && !showCreateUserForm && <ClientCard setSelectedValue={setSelectedValue} />}
    </div>
  );
};
