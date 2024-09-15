'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCreateInvoiceFormContext } from '@/context/app-context';
import { FormType, Item } from '@/context/model';
import { cn } from '@/lib/utils';

type Props = {
  item: Item;
  itemIndex: number;
  onRemoveItem: UseFieldArrayRemove;
};

export const AddedItem: React.FC<Props> = ({ item, itemIndex, onRemoveItem }) => {
  const { getValues, control, formState } = useFormContext<FormType>();
  const {
    appConfig: { currencies },
  } = useCreateInvoiceFormContext();
  const { currency } = getValues();

  const currencySign = currencies.find((el) => el.value === currency.value)?.sign;

  return (
    <>
      <div className="my-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FormField
            control={control}
            name={`items.${itemIndex}.name`}
            render={({ field }) => (
              <FormItem className="flex w-full space-y-0">
                <FormControl>
                  <Input
                    className={cn(
                      'rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
                    )}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`items.${itemIndex}.description`}
            render={({ field }) => (
              <FormItem className="flex w-full space-y-0">
                <FormControl>
                  <Input
                    placeholder={item.description}
                    className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Trash2
            size={48}
            className="hover:cursor-pointer"
            onClick={() => onRemoveItem()}
            // onClick={() => {
            //    setItems((prev) => prev.filter((el) => el.id !== item.id));
            //   setValue('items', onRemoveItem); // gets ts error when items.array.nonEmpty() from zod
            // }}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={control}
            name={`items.${itemIndex}.category`}
            render={({ field }) => (
              <FormItem className="w-1/5">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Service', 'SomethingElse'].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`items.${itemIndex}.unit`}
            render={({ field }) => {
              console.log(field);
              return (
                <FormItem className="w-1/5">
                  <Select onValueChange={(value) => field.onChange(+value)}>
                    <SelectTrigger className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((option) => (
                        <SelectItem key={option} value={String(option)}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name={`items.${itemIndex}.price`}
            render={() => (
              <FormItem className="w-1/5">
                <Input
                  placeholder={`${item.price} ${currencySign}`}
                  className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`items.${itemIndex}.vat`}
            render={({ field }) => (
              <FormItem className="w-1/5">
                <Select onValueChange={(value) => field.onChange(+value)} defaultValue={String(field.value)}>
                  <SelectTrigger
                    className={cn(
                      'rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                      !!formState.errors.items?.[itemIndex]?.vat && '!border-dark-orange', // might not need
                    )}
                  >
                    {field.value}%
                  </SelectTrigger>
                  <SelectContent>
                    {[22, 23, 24, 25, 26].map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`items.${itemIndex}.discount`}
            render={({ field }) => {
              console.log(field);
              console.log(formState.errors.items?.[itemIndex]?.discount);
              return (
                <FormItem className="w-1/5">
                  <Input
                    type="number"
                    placeholder="Discount %"
                    className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    error={!!formState.errors.items?.[itemIndex]?.discount}
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
      <Separator />
    </>
  );
};
