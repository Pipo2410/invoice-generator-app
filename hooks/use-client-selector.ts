'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldErrors, useFormContext, useWatch } from 'react-hook-form';

import { useCreateInvoiceFormContext } from '@/context/app-context';
import { DEFAULT_CLIENT } from '@/context/helpers';
import { ClientSchema, FormType } from '@/context/model';
import { Client } from '@/context/model';
import { useToast } from '@/hooks/use-toast';
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
