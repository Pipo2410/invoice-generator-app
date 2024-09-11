'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { FieldErrors, useFormContext, useWatch } from 'react-hook-form';

import { useCreateInvoiceFormContext } from '@/context/app-context';
import { DEFAULT_CLIENT } from '@/context/helpers';
import { FormType } from '@/context/model';
import { Client } from '@/context/model';
import { sendCreateClientRequest, updateClientRequest } from '@/lib/server-utils';

type UseClientSelector = {
  selectedValue: string;
  searchValue: string;
  showCreateUserForm: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filteredItems: { label: string; value: string; id: string }[];
  errors: FieldErrors<FormType>;
  currentClient: Client;
  isNewClient: boolean;
  onSelect: (value: string) => void;
  editClientCardHandler: () => void;
  removeClientCardHandler: () => void;
  cancelClientCreationHandler: () => void;
  submitClientCreationHandler: (client: Client, action: 'create' | 'update') => Promise<void>;
};

export const useClientSelector = (): UseClientSelector => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [isNewClient, setIsNewClient] = useState(false);
  const { clients, setClients } = useCreateInvoiceFormContext();
  const { setValue, formState } = useFormContext();
  const currentClient: Client = useWatch({ name: 'client' });

  const handleClientSelection = useCallback(() => {
    if (isNewClient) {
      setShowCreateUserForm(true);
    } else {
      const selectedClient = clients.find((client) => client.id === selectedValue);
      if (selectedClient) {
        setValue('client', selectedClient);
      }
    }
  }, [selectedValue, isNewClient, clients, setValue]);

  useEffect(() => {
    handleClientSelection();
  }, [handleClientSelection]);

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

  const submitClientCreationHandler = async (client: Client, action: 'create' | 'update') => {
    try {
      // handle this
      const updatedClients =
        action === 'create' ? await sendCreateClientRequest(client) : await updateClientRequest(client);
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

  const cancelClientCreationHandler = () => {
    if (isNewClient) setSelectedValue('');
    setIsNewClient(false);
    setShowCreateUserForm(false);
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
    setIsNewClient(value === 'create-new');
    setSelectedValue(value);
  };

  return {
    selectedValue,
    searchValue,
    showCreateUserForm,
    setSearchValue,
    filteredItems,
    errors,
    currentClient,
    isNewClient,
    onSelect,
    editClientCardHandler,
    removeClientCardHandler,
    cancelClientCreationHandler,
    submitClientCreationHandler,
  };
};
