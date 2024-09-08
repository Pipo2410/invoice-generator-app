'use client';

import React from 'react';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type CreateClientContextValues = {
  businessName: string;
  setBusinessName: Dispatch<SetStateAction<string>>;
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
  currencyValue: string;
  setCurrencyValue: Dispatch<SetStateAction<string>>;
  currencyDefault: boolean;
  setCurrencyDefault: Dispatch<SetStateAction<boolean>>;
  nif: string;
  setNif: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  streetAddress: string;
  setStreetAddress: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  postalCode: string;
  setPostalCode: Dispatch<SetStateAction<string>>;
  floorNumber: string;
  setFloorNumber: Dispatch<SetStateAction<string>>;
};

type CreateContextProviderProps = {
  children?: React.ReactNode;
};

export const CreateClientContext = createContext<CreateClientContextValues | null>(null);
CreateClientContext.displayName = 'CreateClientContext';

export const CreateClientContextProvider: React.FC<CreateContextProviderProps> = ({ children }) => {
  const [businessName, setBusinessName] = useState('');
  const [country, setCountry] = useState('');
  const [currencyValue, setCurrencyValue] = useState('');
  const [currencyDefault, setCurrencyDefault] = useState(false);
  const [nif, setNif] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [floorNumber, setFloorNumber] = useState('');

  return (
    <CreateClientContext.Provider
      value={{
        businessName,
        setBusinessName,
        country,
        setCountry,
        currencyValue,
        setCurrencyValue,
        currencyDefault,
        setCurrencyDefault,
        nif,
        setNif,
        email,
        setEmail,
        streetAddress,
        setStreetAddress,
        city,
        setCity,
        postalCode,
        setPostalCode,
        floorNumber,
        setFloorNumber,
      }}
    >
      {children}
    </CreateClientContext.Provider>
  );
};

export const useCreateClientContext = (): CreateClientContextValues => {
  const context = useContext(CreateClientContext);
  if (!context) {
    throw new Error('useCreateClientContext must be used withing a CreateClientContextProvider');
  }
  return context;
};
