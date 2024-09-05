import { createContext, useContext } from 'react';

import { AppConfig, Client, InitialCreateInvoiceState, Items } from './model';

type CreateInvoiceFormContextValues = {
  clients: Client[];
  appConfig: AppConfig;
  items: Items;
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
  return (
    <CreateInvoiceFormContext.Provider
      value={{
        clients: initialState.clients,
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
