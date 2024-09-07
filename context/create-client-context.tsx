'use client';

import React, { useMemo } from 'react';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { z } from 'zod';

const newClientSchema = z.object({});

type CreateClientContextValues = {
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
};

type CreateContextProviderProps = {
  children?: React.ReactNode;
};

export const CreateClientContext = createContext<CreateClientContextValues | null>(null);
CreateClientContext.displayName = 'CreateClientContext';

export const CreateClientContextProvider: React.FC<CreateContextProviderProps> = ({ children }) => {
  const [first, setfirst] = useState(second);

  return <CreateClientContext.Provider value={{}}>{children}</CreateClientContext.Provider>;
};

export const useCreateClientContext = (): CreateClientContextValues => {
  const context = useContext(CreateClientContext);
  if (!context) {
    throw new Error('useCreateClientContext must be used withing a CreateClientContextProvider');
  }
  return context;
};
