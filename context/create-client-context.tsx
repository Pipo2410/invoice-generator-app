'use client';

import React from 'react';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { Client } from './model';

type CreateClientContextValues = {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
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
  currentClient: Client;
  children?: React.ReactNode;
};

export const CreateClientContext = createContext<CreateClientContextValues | null>(null);
CreateClientContext.displayName = 'CreateClientContext';

export const CreateClientContextProvider: React.FC<CreateContextProviderProps> = ({ currentClient, children }) => {
  const [id, setId] = useState(currentClient.id);
  const [businessName, setBusinessName] = useState(currentClient.businessName);
  const [country, setCountry] = useState(currentClient.country);
  const [currencyValue, setCurrencyValue] = useState(currentClient.currency.value);
  const [currencyDefault, setCurrencyDefault] = useState(currentClient.currency.isDefault);
  const [nif, setNif] = useState(currentClient.nif);
  const [email, setEmail] = useState(currentClient.email);
  const [streetAddress, setStreetAddress] = useState(currentClient.address?.street || '');
  const [city, setCity] = useState(currentClient.address?.city || '');
  const [postalCode, setPostalCode] = useState(currentClient.address?.postalCode || '');
  const [floorNumber, setFloorNumber] = useState(currentClient.address?.additional || '');

  return (
    <CreateClientContext.Provider
      value={{
        id,
        setId,
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
