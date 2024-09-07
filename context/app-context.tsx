import React, { Dispatch, SetStateAction, useState } from 'react';
import { createContext, useContext } from 'react';

import { AppConfig, Client, InitialCreateInvoiceState, Item } from './model';

type CreateInvoiceFormContextValues = {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  appConfig: AppConfig;
  items: Item[];
};

type CreateInvoiceFormContextProviderProps = {
  children?: React.ReactNode;
  initialState: InitialCreateInvoiceState;
};

export const CreateInvoiceFormContext = createContext<CreateInvoiceFormContextValues | null>(null);
CreateInvoiceFormContext.displayName = 'CreateInvoiceFormContext';

export const CreateInvoiceFormContextProvider: React.FC<CreateInvoiceFormContextProviderProps> = ({
  children,
  initialState,
}) => {
  const [clients, setClients] = useState(initialState.clients);
  return (
    <CreateInvoiceFormContext.Provider
      value={{
        clients: clients,
        setClients: setClients,
        appConfig: initialState.appConfig,
        items: initialState.items,
      }}
    >
      {children}
    </CreateInvoiceFormContext.Provider>
  );
};

export const useCreateInvoiceFormContext = (): CreateInvoiceFormContextValues => {
  const context = useContext(CreateInvoiceFormContext);
  if (!context) {
    throw new Error('useCreateInvoiceFormContext must be used withing a CreateInvoiceFormContextProvider');
  }
  return context;
};
