import { CheckCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';

import { useCreateInvoiceFormContext } from '@/context/app-context';
import { useCreateClientContext } from '@/context/create-client-context';
import { FormType } from '@/context/model';

import { AutoComplete } from '../autocomplete';

export const SearchNifSelector = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { formState } = useFormContext();
  const { setNif, nif } = useCreateClientContext();

  const {
    appConfig: { companies },
  } = useCreateInvoiceFormContext();

  const filteredItems = useMemo(
    () =>
      companies.reduce<{ label: string; value: string; id: string }[]>((acc, company) => {
        const input = searchValue.toLowerCase();
        const companyName = company.name.toLowerCase();
        const nifNumber = company.nif.toLowerCase();

        if (nifNumber.includes(input) || companyName.includes(input)) {
          acc.push({
            label: company.nif,
            value: company.name,
            id: company.id,
          });
        }
        return acc;
      }, []),
    [searchValue],
  );

  const onSelect = (value: string) => {
    const company = companies.find((el) => el.id === value);
    if (company) {
      setNif(company.nif);
      // setSearchValue(company.nif);
    }
  };

  const errors: FieldErrors<FormType> = formState.errors;
  return (
    <div className="flex flex-col gap-1">
      <AutoComplete
        selectedValue={nif}
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
      {nif ? (
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
