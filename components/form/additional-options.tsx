import { Info } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormType } from '@/utils/model';

import { FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { CustomCheckbox } from './custom-checkbox';
import { CustomInput } from './custom-input';

type Props = {
  form: UseFormReturn<FormType>;
};

export const AdditionalOptions: React.FC<Props> = ({ form }) => {
  const { formState, control } = form;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="my-4 flex-none gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:text-dark-blue hover:no-underline data-[state=open]:bg-dark-blue data-[state=open]:text-white">
          Additional options
        </AccordionTrigger>
        <AccordionContent className="m-6 flex flex-col gap-6 py-0">
          <div className="flex flex-col gap-6">
            <FormField
              control={control}
              name="retention.isSelected"
              render={({ field }) => (
                <FormItem className="w-full">
                  <CustomCheckbox
                    text="Include retention %"
                    id="retention"
                    checked={field.value}
                    onClick={(value) => field.onChange(value)}
                  >
                    <FormField
                      control={control}
                      name="retention.value"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex items-center gap-2">
                            <Input
                              className="w-fit rounded-lg border-none bg-secondary px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                              type="number"
                              placeholder="0%"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
                            <TooltipProvider delayDuration={200}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info />
                                </TooltipTrigger>
                                <TooltipContent side="right" className="w-72 p-4">
                                  This is an informative toast or section added to a page lorem ipsum dolor sit amet.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CustomCheckbox>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="globalDiscount.isSelected"
              render={({ field }) => (
                <FormItem className="w-full">
                  <CustomCheckbox
                    text="Apply global discount"
                    id="discount"
                    checked={field.value}
                    onClick={(value) => field.onChange(value)}
                  >
                    <FormField
                      control={control}
                      name="globalDiscount.value"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(selectedValue) => field.onChange(+selectedValue)}>
                            <SelectTrigger className="w-48 rounded-sm border-none bg-secondary px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                              <span>
                                {field.value ? (
                                  <span className="mr-1">{field.value}</span>
                                ) : (
                                  <span className="mr-1 text-dark-gray">15</span>
                                )}
                                %
                              </span>
                            </SelectTrigger>
                            <SelectContent>
                              {[5, 10, 15].map((option) => (
                                <SelectItem key={option} value={String(option)}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </CustomCheckbox>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name={`additionalOptions.purchaseOrder`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CustomInput
                    id="purchase-order"
                    type="text"
                    placeholder="Purchase order"
                    value={field.value}
                    error={!!formState.errors.additionalOptions?.purchaseOrder}
                    onInputHandler={(value) => field.onChange(value)} // Only called on blur
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`additionalOptions.referenceNote`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CustomInput
                    id="purchase-order"
                    type="text"
                    placeholder="Reference note"
                    value={field.value}
                    error={!!formState.errors.additionalOptions?.referenceNote}
                    onInputHandler={(value) => field.onChange(value)} // Only called on blur
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
