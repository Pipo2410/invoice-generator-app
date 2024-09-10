'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';

import { AutoComplete } from '@/components/form/autocomplete';
import { ClientCard } from '@/components/form/client/client-card';
import { CreateClient } from '@/components/form/client/create-client';
import { CurrencySelector } from '@/components/form/currency-selector';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { CreateClientContextProvider } from '@/context/create-client-context';
import { ClientSchema, FormType } from '@/context/model';
import { Client } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
import { sendCreateClientRequest } from '@/lib/server-utils';

export const ClientSelector = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const { clients, setClients } = useCreateInvoiceFormContext();
  const { setValue, formState } = useFormContext();
  const { toast } = useToast();

  useEffect(() => {
    if (selectedValue === 'create-new') {
      setShowCreateUserForm(true);
      return;
    }
    // investigate this
    const selectedClient = clients.find(
      (client) => client.businessName === selectedValue || client.nif === selectedValue,
    );
    if (selectedClient) {
      setValue('client', selectedClient);
    }
  }, [selectedValue, clients, setValue]);

  const errors: FieldErrors<FormType> = formState.errors;

  const newItems = clients.map((item) => ({
    label: item.businessName,
    value: item.nif,
  }));

  console.log(newItems);

  const filteredItems = newItems.filter(
    (client) =>
      client.value.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const cancelClientCreationHandler = () => {
    setSelectedValue('');
    setShowCreateUserForm(false);
  };

  const submitClientCreationHandler = async (client: Client) => {
    const isFormValid = ClientSchema.safeParse(client);
    if (!isFormValid.success) {
      console.log(isFormValid.error.issues);
      // const errorFields = isFormValid.error.issues.map((el) => el.path[0]);
      toast({
        title: 'Error',
        // description: `Please fill all required fields: ${errorFields}`,
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    const clients: Client[] = await sendCreateClientRequest(client);
    console.log(clients);
    setValue('client', client);
    setValue('currency.value', client.currency.value);
    setShowCreateUserForm(false);
    setSelectedValue('389643090');
    setClients(clients);
  };

  return (
    <>
      {!selectedValue && (
        <>
          <CurrencySelector />
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
              error={!!errors.client}
              addOption={true}
            />
            <p className="ml-4 text-sm text-dark-gray">Client legal name or company NIF number</p>
          </div>
        </>
      )}

      {showCreateUserForm && (
        <CreateClientContextProvider>
          <CreateClient onCancel={cancelClientCreationHandler} onSubmit={submitClientCreationHandler} />
        </CreateClientContextProvider>
      )}

      {selectedValue && !showCreateUserForm && <ClientCard setSelectedValue={setSelectedValue} />}
    </>
  );
};
