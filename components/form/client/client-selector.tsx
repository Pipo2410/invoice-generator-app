'use client';

import React from 'react';

import { AutoComplete } from '@/components/form/autocomplete';
import { ClientCard } from '@/components/form/client/client-card';
import { CreateClient } from '@/components/form/client/create-client';
import { CurrencySelector } from '@/components/form/currency-selector';
import { CreateClientContextProvider } from '@/context/create-client-context';
import { useClientSelector } from '@/hooks/use-client-selector';

export const ClientSelector = () => {
  const {
    selectedValue,
    searchValue,
    showCreateUserForm,
    filteredItems,
    errors,
    currentClient,
    isNewClient,
    setSearchValue,
    onSelect,
    editClientCardHandler,
    removeClientCardHandler,
    cancelClientCreationHandler,
    submitClientCreationHandler,
  } = useClientSelector();

  return (
    <>
      {!selectedValue && !showCreateUserForm && (
        <>
          <CurrencySelector />
          <div className="flex flex-col gap-1">
            <AutoComplete
              selectedValue={selectedValue}
              onSelectedValueChange={onSelect}
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              items={filteredItems ?? []}
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
