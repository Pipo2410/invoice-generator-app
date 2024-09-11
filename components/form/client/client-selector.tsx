'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { FieldErrors, useFormContext, useWatch } from 'react-hook-form';

import { AutoComplete } from '@/components/form/autocomplete';
import { ClientCard } from '@/components/form/client/client-card';
import { CreateClient } from '@/components/form/client/create-client';
import { CurrencySelector } from '@/components/form/currency-selector';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { CreateClientContextProvider } from '@/context/create-client-context';
import { DEFAULT_CLIENT } from '@/context/helpers';
import { ClientSchema, FormType } from '@/context/model';
import { Client } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
import { sendCreateClientRequest, updateClientRequest } from '@/lib/server-utils';

export const ClientSelector = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [isNewClient, setIsNewClient] = useState(false);
  const { clients, setClients } = useCreateInvoiceFormContext();
  const { setValue, formState } = useFormContext();
  const { toast } = useToast();
  const currentClient: Client = useWatch({ name: 'client' });

  useEffect(() => {
    if (isNewClient) {
      setShowCreateUserForm(true);
      return;
    }

    const selectedClient = clients.find((client) => client.id === selectedValue);

    if (selectedClient) {
      setValue('client', selectedClient);
    }
  }, [selectedValue, isNewClient, clients, setValue]);

  const errors: FieldErrors<FormType> = formState.errors;

  const filteredItems = clients.reduce<{ label: string; value: string; id: string }[]>((acc, client) => {
    const input = searchValue.toLowerCase();
    const clientName = client.businessName.toLowerCase();
    const nifNumber = client.nif.toLowerCase();

    if (nifNumber.includes(input) || clientName.includes(input)) {
      acc.push({
        label: client.businessName,
        value: client.nif,
        id: client.id,
      });
    }
    return acc;
  }, []);

  const cancelClientCreationHandler = () => {
    if (isNewClient) {
      setSelectedValue('');
    }
    setIsNewClient(false);
    setShowCreateUserForm(false);
  };

  const submitClientCreationHandler = async (client: Client, action: 'create' | 'update') => {
    const isFormValid = ClientSchema.safeParse(client);
    if (!isFormValid.success) {
      const errorFields = isFormValid.error.issues.map((el) => el.path[0]);
      toast({
        title: 'Error',
        description: `Please fill all required fields: ${errorFields}`,
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }

    let updatedClients: Client[];
    console.log('action');
    try {
      // handle this
      if (action === 'create') {
        updatedClients = await sendCreateClientRequest(client);
      } else {
        updatedClients = await updateClientRequest(client);
      }
      setValue('client', client);
      setValue('currency.value', client.currency.value);
      setShowCreateUserForm(false);
      setIsNewClient(false);
      setClients(updatedClients);
      setSelectedValue(client.id); // Show the newly created client card
    } catch (error) {
      console.error(error);
    }
  };

  const editClientCardHandler = () => {
    setIsNewClient(false);
    setShowCreateUserForm(true);
  };

  const removeClientCardHandler = () => {
    setSelectedValue('');
    setSearchValue('');
    setValue('client', DEFAULT_CLIENT);
    setShowCreateUserForm(false);
  };

  const onSelect = (value: string) => {
    if (value === 'create-new') {
      setIsNewClient(true);
    } else {
      setSelectedValue(value);
      setIsNewClient(false);
    }
  };

  return (
    <>
      {!selectedValue && !showCreateUserForm && (
        <>
          <CurrencySelector />
          <div className="flex flex-col gap-1">
            <AutoComplete
              selectedValue={selectedValue}
              onSelectedValueChange={(value) => onSelect(value)}
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              items={filteredItems ?? []}
              emptyMessage="No items found."
              placeholder="Search or add a client..."
              searchWrapperClasses="bg-secondary"
              inputClassNames="h-fit text-base leading-4 border-none py-4 px-0 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
              iconClassName="mr-3 h-6 w-6"
              error={!!errors.client}
              addOption={true}
            />
            <p className="ml-4 text-sm text-dark-gray">Client legal name or company NIF number</p>
          </div>
        </>
      )}

      {showCreateUserForm && (
        <CreateClientContextProvider currentClient={currentClient}>
          <CreateClient
            onCancel={cancelClientCreationHandler}
            onSubmit={submitClientCreationHandler}
            isNewClient={isNewClient}
          />
        </CreateClientContextProvider>
      )}

      {selectedValue && !showCreateUserForm && (
        <ClientCard onEdit={editClientCardHandler} onClose={removeClientCardHandler} />
      )}
    </>
  );
};
