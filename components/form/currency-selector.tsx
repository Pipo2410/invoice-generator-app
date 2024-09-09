'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { cn } from '@/lib/utils';

import { IconComponent } from '../navigation/icon-component';

export const CurrencySelector = () => {
  const [open, setOpen] = useState(false);
  const {
    appConfig: { currencies },
  } = useCreateInvoiceFormContext();
  const { getValues, setValue } = useFormContext();

  const currencyValue = getValues('currency.value');
  const selectedCurrency = currencies.find((cur) => cur.value === currencyValue);
  const icon = selectedCurrency?.icon || currencies[0]?.icon;
  const displayValue = selectedCurrency?.value || currencies[0]?.value;

  const handleSelect = (currentValue: string) => {
    setValue('currency.value', currentValue === currencyValue ? '' : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'group w-fit justify-start gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:bg-transparent hover:text-dark-blue focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-dark-blue data-[state=open]:text-white',
          )}
        >
          <>
            <IconComponent icon={icon} className="h-5 w-5 fill-dark-gray" />
            {displayValue}
            <ChevronDown className="relative top-[1px] ml-1 h-5 w-5 transition duration-200 group-data-[state=open]:rotate-180" />
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit rounded-3xl p-0">
        <Command className="rounded-3xl">
          <CommandInput
            searchWrapperClasses="bg-secondary"
            iconClassName="mr-3 h-4 w-4"
            placeholder="Search"
            className="text-base font-normal"
          />
          <CommandList className="max-h-fit">
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup className="p-0">
              {currencies.map((cur) => (
                <CommandItem
                  className="gap-3 py-4 pl-4 data-[selected=true]:bg-light-blue"
                  key={cur.value}
                  value={cur.value}
                  onSelect={handleSelect}
                >
                  <IconComponent icon={cur.icon} className="h-8 w-8 fill-dark-gray" />
                  <div className="flex flex-col">
                    <span className="text-base">{cur.label}</span>
                    <span className="text-xs">{cur.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
