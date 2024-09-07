'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// import { FormType } from '@/components/layout/content';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { cn } from '@/lib/utils';

import { IconComponent } from '../navigation/icon-component';

type Props = {
  type: 'ghost' | 'button';
};

export const CurrencySelector: React.FC<Props> = ({ type }) => {
  const [open, setOpen] = useState(false);
  const {
    appConfig: { currencies },
  } = useCreateInvoiceFormContext();
  const { getValues, setValue } = useFormContext();

  const values = getValues('invoice.currency'); // create new form

  const icon = currencies.find((cur) => cur.label === values)?.icon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          type="button"
          aria-expanded={open}
          className={cn(
            'group justify-start gap-1 transition-colors hover:text-dark-blue focus-visible:ring-0 focus-visible:ring-offset-0',
            type === 'button'
              ? 'h-fit min-h-16 w-1/2 justify-between rounded-2xl border border-secondary bg-secondary p-4 py-3 text-base font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border data-[state=open]:border-[#E2E2E2] data-[state=open]:bg-light-blue'
              : 'w-fit rounded-full px-3 py-2 text-dark-blue hover:bg-transparent data-[state=open]:bg-dark-blue data-[state=open]:text-white',
            // : 'w-1/2 rounded-2xl border-none px-0 py-4 pt-[30px] text-base leading-4 placeholder:text-base placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border data-[state=open]:border-[#E2E2E2] data-[state=open]:bg-light-blue'
          )}
        >
          {type === 'ghost' ? (
            <>
              <IconComponent icon={icon ?? currencies[0].icon} className="h-5 w-5 fill-dark-gray" />
              {values ? currencies.find((cur) => cur.label === values)?.value : currencies[0].label}
              <ChevronDown className="relative top-[1px] ml-1 h-5 w-5 transition duration-200 group-data-[state=open]:rotate-180" />
            </>
          ) : (
            <>
              <div className="flex flex-col text-start">
                {values ? (
                  <>
                    <span className="text-xs text-dark-gray">Issue date</span>
                    <span className="leading-[22px]">{values}</span>
                  </>
                ) : (
                  <span>Select due date</span>
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-fit rounded-3xl p-0', type === 'button' && 'w-[--radix-popover-trigger-width]')}>
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
                  value={cur.label}
                  onSelect={(currentValue) => {
                    setValue('invoice.currency', currentValue === values ? '' : currentValue);
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
