'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FormType, Item } from '@/context/model';
import { cn } from '@/lib/utils';

type Props = {
  item: Item;
  itemIndex: number;
  onRemoveItem: UseFieldArrayRemove;
};

export const AddedItem: React.FC<Props> = ({ item, itemIndex, onRemoveItem }) => {
  const { control, formState } = useFormContext<FormType>();

  return (
    <>
      <div className="my-6 flex flex-col gap-3">
        <div className="flex items-end gap-2">
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">Item name</p>
            <FormField
              control={control}
              name={`items.${itemIndex}.name`}
              render={({ field }) => (
                <FormItem className="flex space-y-0">
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
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">Description</p>
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
          </div>
          <Trash2 size={48} className="hover:cursor-pointer" onClick={() => onRemoveItem(itemIndex)} />
        </div>
        <div className="flex gap-2">
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">Item category</p>
            <FormField
              control={control}
              name={`items.${itemIndex}.category`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Service', 'Other', 'Another'].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">Unit</p>
            <FormField
              control={control}
              name={`items.${itemIndex}.unit`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={(value) => field.onChange(+value)} defaultValue={String(field.value)}>
                    <SelectTrigger className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <>{field.value} UN</>
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
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">Price</p>
            <FormField
              control={control}
              name={`items.${itemIndex}.price`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input
                    type="number"
                    // placeholder={`${item.price} ${currencySign}`}
                    className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">VAT</p>
            <FormField
              control={control}
              name={`items.${itemIndex}.vat`}
              render={({ field }) => (
                <FormItem className="w-full">
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
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-xs">Discount</p>
            <FormField
              control={control}
              name={`items.${itemIndex}.discount`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input
                    type="number"
                    max={100}
                    min={0}
                    placeholder="Discount %"
                    className="rounded-sm border-transparent bg-white px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    error={!!formState.errors.items?.[itemIndex]?.discount}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};
