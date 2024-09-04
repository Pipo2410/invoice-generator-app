'use client';

import { Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { currencies } from '@/assets/currencies';
import { FormType } from '@/components/layout/content';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Items } from '@/context/model';
import { cn } from '@/lib/utils';

type Props = {
  item: Items[number];
  form: UseFormReturn<FormType>;
  itemIndex: number;
};

export const AddedItem: React.FC<Props> = ({ item, form, itemIndex }) => {
  const { getValues } = form;

  const {
    invoice: { currency, items },
  } = getValues();

  const currencySign = currencies.find((el) => el.label === currency)?.sign;
  const filteredItems = items.filter((el) => el.name !== item.name);

  return (
    <>
      <div className="my-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name={`invoice.items.${itemIndex}`}
            render={({ field }) => {
              return (
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
              );
            }}
          />
          <FormField
            control={form.control}
            name="invoice.items"
            render={({ field }) => (
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
              form.setValue('invoice.items', filteredItems); // gets ts error when items.array.nonEmpty() from zod
            }}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="invoice.items"
            render={({ field }) => (
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
            control={form.control}
            name="invoice.items"
            render={({ field }) => (
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
            control={form.control}
            name="invoice.items"
            render={({ field }) => (
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
            control={form.control}
            name="invoice.items"
            render={({ field }) => (
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
            control={form.control}
            name="invoice.items"
            render={({ field }) => (
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
