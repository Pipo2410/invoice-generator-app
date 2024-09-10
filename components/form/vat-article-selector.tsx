'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { FormType } from '@/context/model';
import { cn } from '@/lib/utils';

type Props = {
  form: UseFormReturn<FormType>;
};

export const VatArticleSelector: React.FC<Props> = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const {
    appConfig: { vatArticles },
  } = useCreateInvoiceFormContext();

  const buttonValue = vatArticles.find((framework) => framework.label === selectedValue)?.label;

  const { errors } = form.formState;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'group h-fit w-full justify-between rounded-xl border border-secondary bg-secondary p-5 pl-4 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border data-[state=open]:border-[#E2E2E2] data-[state=open]:bg-light-blue',
            errors.vatExemption && 'border border-dark-orange',
          )}
        >
          <span className="text-base font-normal">{selectedValue ? buttonValue : 'VAT exemption reason'}</span>
          <ChevronDown className="relative top-[1px] h-6 w-6 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] rounded-3xl p-0">
        <Command className="rounded-3xl">
          <CommandInput
            searchWrapperClasses="bg-secondary"
            iconClassName="mr-3 h-6 w-6"
            placeholder="Search VAT article..."
            className="h-fit py-4 text-base font-normal"
          />
          <CommandList className="max-h-fit">
            <CommandEmpty>No article found.</CommandEmpty>
            <CommandGroup className="p-0">
              {vatArticles.map((article) => (
                <FormField
                  key={article.value}
                  control={form.control}
                  name="vatExemption.value"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <CommandItem
                          className={cn(
                            'gap-3 rounded-none py-4 pl-4 data-[selected=true]:bg-[#F8F8F8]',
                            selectedValue === article.label && 'bg-[#F8F8F8]',
                          )}
                          value={article.label}
                          onSelect={(currentValue) => {
                            setSelectedValue(currentValue === selectedValue ? '' : currentValue);
                            setOpen(false);
                            form.setValue('vatExemption', article);
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="text-base">{article.label}</span>
                            <span className="text-xs">{article.value}</span>
                          </div>
                        </CommandItem>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
