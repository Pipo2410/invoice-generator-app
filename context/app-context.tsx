import React, { Dispatch, SetStateAction, useState } from 'react';
import { createContext, useContext } from 'react';

import { AppConfig, Client, InitialCreateInvoiceState, Item } from '../utils/model';

type CreateInvoiceFormContextValues = {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  appConfig: AppConfig;
  items: Item[];
  invoiceId: number;
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
        clients,
        setClients: setClients,
        appConfig: initialState.appConfig,
        items: initialState.items,
        invoiceId: initialState.invoiceId,
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
