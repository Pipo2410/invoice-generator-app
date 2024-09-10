import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';

import { useCreateClientContext } from '@/context/create-client-context';
import { COMPANIES } from '@/context/helpers';
import { FormType } from '@/context/model';

import { AutoComplete } from '../autocomplete';

const TRANSFORMED_ITEMS = COMPANIES.map((item) =>
  // const formattedPrice = new Intl.NumberFormat('de-DE', {
  // 	minimumFractionDigits: 2,
  // 	maximumFractionDigits: 2,
  // }).format(Number(item.description));

  ({
    label: item.nif,
    value: item.name,
  }),
);

export const SearchNifSelector = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const { formState } = useFormContext();
  const { setNif } = useCreateClientContext();

  const filteredItems = TRANSFORMED_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.value.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const onSelect = (value: string) => {
    const company = COMPANIES.find((el) => el.name === value);
    setSelectedValue(value);
    if (company) {
      setNif(company.nif);
    }

    // if (company?.name) {
    // setBusinessName(company?.name);
    // }
  };

  const errors: FieldErrors<FormType> = formState.errors;
  return (
    <div className="flex flex-col gap-1">
      <AutoComplete
        selectedValue={selectedValue}
        onSelectedValueChange={(value) => onSelect(value)}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={filteredItems ?? []}
        // Optional props
        emptyMessage="No items found."
        placeholder="Search or create an item"
        searchWrapperClasses="bg-secondary"
        inputClassNames="h-fit text-base leading-4 border-none py-4 px-0 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
        iconClassName="mr-3 h-6 w-6"
        error={!!errors.items}
        chooseValueBy="label"
      />
      {selectedValue ? (
        <p className="ml-4 flex gap-1 text-sm text-[#27A251]">
          <CheckCircle width={20} height={20} />
          <span>Valid NIF</span>
        </p>
      ) : (
        <p className="ml-4 text-sm text-dark-gray">Use the NIF to fill the client details</p>
      )}
    </div>
  );
};
