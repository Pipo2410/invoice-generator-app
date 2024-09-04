'use client';

import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType } from '@/components/layout/content';
import { CLIENTS_ARRAY } from '@/context/helpers';

import { AutoComplete } from '../autocomplete';
import { ClientCard } from './client-card';

type Props = {
  form: UseFormReturn<FormType>;
};

export const ClientSelector: React.FC<Props> = ({ form }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    // investigate this
    const selectedClient = CLIENTS_ARRAY.find(
      (client) => client.businessName === selectedValue || String(client.nif) === selectedValue,
    );
    if (selectedClient) {
      form.setValue('invoice.client', selectedClient);
    }
  }, [selectedValue]);

  const { errors } = form.formState;

  const newItems = CLIENTS_ARRAY.map((item) => {
    return {
      label: item.businessName,
      value: String(item.nif),
    };
  });

  const filteredItems = newItems.filter(
    (client) =>
      client.value.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div>
      {!selectedValue && (
        <div className="flex flex-col gap-1">
          <AutoComplete
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            items={filteredItems ?? []}
            // Optional props
            emptyMessage="No items found."
            placeholder="Search or add a client..."
            searchWrapperClasses="bg-secondary"
            // inputClassNames="w-full h-fit py-5 justify-between text-base text-foreground font-normal placeholder:text-dark-gray placeholder:text-base border-none rounded-2xl"
            inputClassNames="h-fit text-base leading-4 border-none py-4 px-0 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
            iconClassName="mr-3 h-6 w-6"
            error={!!errors.invoice?.client}
          />
          <p className="ml-4 text-sm text-dark-gray">Client legal name or company NIF number</p>
        </div>
      )}

      {selectedValue && <ClientCard setSelectedValue={setSelectedValue} />}
    </div>
  );
};
