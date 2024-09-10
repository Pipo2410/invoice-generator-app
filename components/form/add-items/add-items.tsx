'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FieldErrors, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { AutoComplete } from '@/components/form/autocomplete';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { Currency, FormType, Item } from '@/context/model';
import { toast } from '@/hooks/use-toast';

export const AddItems = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const { items } = useCreateInvoiceFormContext();
  const { getValues, formState } = useFormContext();
  const currency: Currency = useWatch({ name: 'currency' });
  const ItemsArray = getValues('items');
  const { append } = useFieldArray({
    name: 'items',
  });

  const filteredItems = useMemo(
    () =>
      items.reduce<{ label: string; value: string; id: string }[]>((acc, item) => {
        const input = searchValue.toLowerCase();
        const itemName = item.name.toLowerCase();
        const formattedPrice = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: currency.value,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(item.price);

        if (itemName.includes(input)) {
          acc.push({
            label: item.name,
            value: formattedPrice,
            id: item.id,
          });
        }
        return acc;
      }, []),
    [searchValue, currency, items],
  );

  useEffect(() => {
    const selectedItem = items.find((item) => item.id === selectedValue);

    const isPreviouslyAdded = ItemsArray.findIndex((item: Item) => item.id === selectedItem?.id);

    if (isPreviouslyAdded !== -1) {
      toast({
        description: 'Item is already added',
        duration: 3000,
        title: 'Error',
        variant: 'destructive',
      });
      return;
    }

    if (selectedItem) {
      append(selectedItem);
    }
  }, [selectedValue]);

  const errors: FieldErrors<FormType> = formState.errors;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger
          icon="plus"
          className="my-4 flex-none gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:text-dark-blue hover:no-underline data-[state=open]:bg-dark-blue data-[state=open]:text-white"
        >
          Add items
        </AccordionTrigger>
        <AccordionContent className="my-4 py-0">
          <AutoComplete
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            items={filteredItems ?? []}
            // Optional props
            emptyMessage="No items found."
            placeholder="Search or create an item"
            inputClassNames="h-fit text-base leading-4 border-none py-4 px-0 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
            iconClassName="mr-3 h-6 w-6"
            error={!!errors.items}
            addOption={true}
            resetOnSelection
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
