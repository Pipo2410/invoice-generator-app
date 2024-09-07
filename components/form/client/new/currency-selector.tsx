'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { IconComponent } from '@/components/navigation/icon-component';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCreateInvoiceFormContext } from '@/context/app-context';

export const CurrencySelector = () => {
  const {
    appConfig: { currencies },
  } = useCreateInvoiceFormContext();

  const [open, setOpen] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(currencies[0].value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          type="button"
          aria-expanded={open}
          className="group h-fit min-h-16 w-1/2 justify-between gap-1 rounded-2xl border border-secondary bg-secondary p-4 py-3 text-base font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border data-[state=open]:border-[#E2E2E2] data-[state=open]:bg-light-blue"
        >
          <div className="flex flex-col text-start">
            {currencyValue ? (
              <>
                <span className="text-xs text-dark-gray">Issue date</span>
                <span className="leading-[22px]">{currencyValue}</span>
              </>
            ) : (
              <span>Select</span>
            )}
          </div>
          <ChevronDown className="relative top-[1px] ml-1 h-5 w-5 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] rounded-3xl p-0">
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
                  onSelect={(clickedValue) => {
                    setCurrencyValue(clickedValue);
                    setOpen(false);
                  }}
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
