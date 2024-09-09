import { Info } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormType } from '@/context/model';

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
            <div className="flex items-center gap-2">
              <Input className="w-fit rounded-lg border-none bg-secondary px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
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
          onInputHandler={(value) => form.setValue('additionalOptions.purchaseOrder', value)}
          // onBlur={(event) => form.setValue('additionalOptions.purchaseOrder', event.target.value)}
        />
        <CustomInput
          placeholder="Purchase order"
          onInputHandler={(value) => form.setValue('additionalOptions.referenceNote', value)}
          // onBlur={(event) => form.setValue('additionalOptions.referenceNote', event.target.value)}
        />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
