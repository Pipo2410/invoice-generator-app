import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType } from '@/components/layout/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Input } from '../ui/input';
import { CustomCheckbox } from './custom-checkbox';
import { CustomInput } from './custom-input';

type Props = {
  form: UseFormReturn<FormType>;
};

export const AdditionalOptions: React.FC<Props> = ({ form }) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1" className="w-full">
      <AccordionTrigger className="my-4 flex-none gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:text-dark-blue hover:no-underline data-[state=open]:bg-dark-blue data-[state=open]:text-white">
        Additional options
      </AccordionTrigger>
      <AccordionContent className="m-6 flex flex-col gap-6 py-0">
        <div className="flex flex-col gap-6">
          <CustomCheckbox text="Include retention %" id="retention">
            <Input className="w-fit rounded-lg border-none bg-secondary px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
          </CustomCheckbox>
          <CustomCheckbox text="Apply global discount" id="discount">
            <Select>
              <SelectTrigger className="w-48 rounded-sm border-none bg-secondary px-2 py-1 text-[#101010] focus:right-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="15%" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15].map((option) => (
                  <SelectItem key={option} value={`${option}`}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CustomCheckbox>
        </div>
        <CustomInput
          placeholder="Reference note"
          onInputHandler={(value) => form.setValue('invoice.additionalOptions.purchaseOrder', value)}
        />
        <CustomInput
          placeholder="Purchase order"
          onInputHandler={(value) => form.setValue('invoice.additionalOptions.referenceNote', value)}
        />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
