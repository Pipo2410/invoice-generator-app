import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType } from '@/components/layout/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { CustomCheckbox } from './custom-checkbox';
import { CustomInput } from './custom-input';

type Props = {
  form: UseFormReturn<FormType>;
};

export const AdditionalOptions: React.FC<Props> = ({ form }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="my-4 flex-none gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:text-dark-blue hover:no-underline data-[state=open]:bg-dark-blue data-[state=open]:text-white">
          Additional options
        </AccordionTrigger>
        <AccordionContent className="m-6 flex flex-col gap-6 py-0">
          <div className="flex flex-col gap-6">
            <CustomCheckbox text="Include retention %" id="retention" inputType="input" />
            <CustomCheckbox text="Apply global discount" id="discount" inputType="select" />
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
};
