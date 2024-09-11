import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { useCreateClientContext } from '@/context/create-client-context';
import { mapErrorsToFields } from '@/context/helpers';
import { Client, ClientSchema } from '@/context/model';
import { toast } from '@/hooks/use-toast';

import { CustomCheckbox } from '../custom-checkbox';
import { CustomInput } from '../custom-input';
import { CountrySelector } from './new/country-selector';
import { CurrencySelector } from './new/currency-selector';
import { SearchNifSelector } from './search-nif-selector';

type Props = {
  isNewClient: boolean;
  onSubmit: (value: Client, action: 'create' | 'update') => void;
  onCancel: () => void;
};

export const CreateClient: React.FC<Props> = ({ isNewClient, onSubmit, onCancel }) => {
  const { clients } = useCreateInvoiceFormContext();
  const {
    id,
    businessName,
    city,
    country,
    currencyDefault,
    currencyValue,
    email,
    nif,
    streetAddress,
    postalCode,
    floorNumber,
    errors,
    setBusinessName,
    setCity,
    setCurrencyDefault,
    setEmail,
    setStreetAddress,
    setPostalCode,
    setFloorNumber,
    setErrors,
  } = useCreateClientContext();

  const newClientId = clients.length + 1;

  const client: Client = {
    id: id || newClientId.toString(),
    businessName,
    address: {
      city,
      street: streetAddress,
      postalCode,
      additional: floorNumber,
    },
    country,
    currency: {
      value: currencyValue,
      isDefault: currencyDefault,
    },
    email,
    nif,
  };

  const onSubmitHandler = () => {
    const validationResult = ClientSchema.safeParse(client);

    if (!validationResult.success) {
      const formattedErrors = mapErrorsToFields(validationResult.error.issues);
      setErrors(formattedErrors);
      toast({
        title: 'Error',
        description: `Please fill all required fields`,
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }

    return isNewClient ? onSubmit(client, 'create') : onSubmit(client, 'update');
  };

  const onClickCheckboxHandler = (value: boolean) => setCurrencyDefault(value);
  return (
    <Card className="rounded-3xl border-x-0 border-t-0 p-6 pt-4">
      <CardHeader className="flex-col justify-between gap-6 space-y-0 p-0">
        <h3 className="font-semibold">Create new client</h3>
        <div className="flex items-center justify-between gap-2">
          <CurrencySelector value={client.currency.value} error={!!errors['currency']} />
          <div className="flex w-1/2 items-center space-x-2 px-4">
            <CustomCheckbox
              text="Default currency for this client"
              id="currency"
              checked={client.currency.isDefault}
              onClick={onClickCheckboxHandler}
            />
          </div>
        </div>
        <CountrySelector error={!!errors['country']} defaultValue={client.country} />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0 py-6">
        <SearchNifSelector value={client.nif} error={!!errors['nif']} />
        <div className="flex flex-col gap-1">
          <CustomInput
            id="business-name"
            type="text"
            placeholder="Client business name*"
            error={!!errors['businessName']}
            value={client.businessName}
            onInputHandler={(value) => setBusinessName(value)}
          />
          <p className="ml-4 text-sm text-dark-gray">*Client legal name required</p>
        </div>
        <div className="flex flex-col gap-1">
          <CustomInput
            id="client-email"
            type="text"
            placeholder="Client email"
            value={client.email}
            error={!!errors['email']}
            onInputHandler={(value) => setEmail(value)}
          />
          <p className="ml-4 text-sm text-dark-gray">Use coma (,) to add more than one email.</p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="w-full border-none">
            <AccordionTrigger
              icon="plus"
              className="my-4 flex-none gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:text-dark-blue hover:no-underline"
            >
              Add additional details
            </AccordionTrigger>
            <AccordionContent className="my-4 flex flex-col gap-4 py-0">
              <CustomInput
                id="street-address"
                type="text"
                placeholder="Street address"
                value={client.address?.street ?? ''}
                onInputHandler={(value) => setStreetAddress(value)}
              />
              <CustomInput
                id="address-city"
                type="text"
                placeholder="City"
                value={client.address?.city ?? ''}
                onInputHandler={(value) => setCity(value)}
              />
              <div className="flex gap-4">
                <CustomInput
                  id="postal-code"
                  type="text"
                  placeholder="Postal code"
                  value={client.address?.postalCode ?? ''}
                  onInputHandler={(value) => setPostalCode(value)}
                  wrapperClasses="w-1/2"
                />
                <CustomInput
                  id="additional-address"
                  type="text"
                  placeholder="Floor, door number"
                  value={client.address?.additional ?? ''}
                  onInputHandler={(value) => setFloorNumber(value)}
                  wrapperClasses="w-1/2"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="justify-around gap-4 px-3">
        <Button
          variant="ghost"
          type="button"
          className="min-h-12 w-full rounded-full border-[1.5px] bg-white py-3.5 font-semibold text-[#7E8081]"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="ghost"
          type="button"
          className="min-h-12 w-full rounded-full border-[1.5px] bg-foreground py-3.5 font-semibold text-white disabled:bg-[#7E8081] disabled:text-white"
          onClick={onSubmitHandler}
        >
          {isNewClient ? 'Create client' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  );
};
