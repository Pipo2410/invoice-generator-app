'use client';

import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AutoComplete } from '@/components/form/autocomplete';
import { FormType } from '@/components/layout/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { INVOICE_ITEMS_ARRAY } from '@/context/helpers';

type Props = {
  form: UseFormReturn<FormType>;
};

const TRANSFORMED_ITEMS = INVOICE_ITEMS_ARRAY.map((item) =>
  // const formattedPrice = new Intl.NumberFormat('de-DE', {
  // 	minimumFractionDigits: 2,
  // 	maximumFractionDigits: 2,
  // }).format(Number(item.description));

  ({
    label: item.name,
    value: item.description,
  }),
);

export const AddItems: React.FC<Props> = ({ form }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const filteredItems = TRANSFORMED_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase()),
  );
  useEffect(() => {
    const selectedItem = INVOICE_ITEMS_ARRAY.find((item) => item.description === selectedValue);

    const invoiceItems = form.getValues('invoice.items');

    if (selectedItem) {
      invoiceItems.push(selectedItem);
      form.setValue('invoice.items', invoiceItems);
      setSearchValue('');
      setSelectedValue('');
      form.trigger('invoice.items');
    }
  }, [selectedValue, form]);

  const { errors } = form.formState;

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
            // inputClassNames="w-full h-fit py-5 justify-between text-base text-foreground font-normal placeholder:text-dark-gray placeholder:text-base border-none rounded-2xl"
            inputClassNames="h-fit text-base leading-4 border-none py-4 px-0 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
            iconClassName="mr-3 h-6 w-6"
            error={!!errors.invoice?.items}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
