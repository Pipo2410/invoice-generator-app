'use client';

import React from 'react';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type DefaultContextValues = {
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
};

type DefaultContextProviderProps = {
  children?: React.ReactNode;
};

export const DefaultContext = createContext<DefaultContextValues | null>(null);
DefaultContext.displayName = 'DefaultContext';

export const DefaultContextProvider: React.FC<DefaultContextProviderProps> = ({ children }) => {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <DefaultContext.Provider
      value={{
        showPreview,
        setShowPreview,
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
};

export const useDefaultContext = (): DefaultContextValues => {
  const context = useContext(DefaultContext);
  if (!context) {
    throw new Error('useDefaultContext must be used withing a DefaultContextProvider');
  }
  return context;
};
