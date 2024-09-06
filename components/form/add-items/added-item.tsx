'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { currencies } from '@/assets/currencies';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Items } from '@/context/model';
import { cn } from '@/lib/utils';

type Props = {
  item: Items[number];
  itemIndex: number;
};

export const AddedItem: React.FC<Props> = ({ item, itemIndex }) => {
  const { getValues, control, setValue } = useFormContext();

  const {
    invoice: { currency, items },
  } = getValues();

  const currencySign = currencies.find((el) => el.label === currency)?.sign;
  const filteredItems = items.filter((el: Items[number]) => el.name !== item.name);

  return (
    <>
      <div className="my-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FormField
            control={control}
            name={`invoice.items.${itemIndex}`}
            render={({ field }) => (
              <FormItem className="flex w-full space-y-0">
                <FormControl>
                  <Input
                    className={cn(
                      'rounded-sm border-none bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
                    )}
                    {...field}
                    value={item.name}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="invoice.items"
            render={() => (
              <FormItem className="flex w-full space-y-0">
                <FormControl>
                  <Input
                    placeholder={item.description}
                    className="rounded-sm border-none bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Trash2
            size={48}
            className="hover:cursor-pointer"
            onClick={() => {
              // setItems((prev) => prev.filter((el) => el.id !== item.id));
              setValue('invoice.items', filteredItems); // gets ts error when items.array.nonEmpty() from zod
            }}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={control}
            name="invoice.items"
            render={() => (
              <FormItem className="w-1/5">
                <Select>
                  <SelectTrigger className="rounded-sm border-none bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="invoice.items"
            render={() => (
              <FormItem className="w-1/5">
                <Select>
                  <SelectTrigger className="rounded-sm border-none bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="invoice.items"
            render={() => (
              <FormItem className="w-1/5">
                <Input
                  placeholder={`${item.price} ${currencySign}`}
                  className="rounded-sm border-none bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="invoice.items"
            render={() => (
              <FormItem className="w-1/5">
                <Select>
                  <SelectTrigger className="rounded-sm border-none bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="invoice.items"
            render={() => (
              <FormItem className="w-1/5">
                <Input
                  placeholder={`${item.discount} %`}
                  className="rounded-sm border-none bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormItem>
            )}
          />
        </div>
      </div>
      <Separator />
    </>
  );
};
