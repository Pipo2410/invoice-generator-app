import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CustomCheckbox } from '../custom-checkbox';
import { CustomInput } from '../custom-input';
import { CurrencySelector } from './new/currency-selector';
import { SearchNifSelector } from './search-nif-selector';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export const CreateClient: React.FC<Props> = ({ onSubmit, onCancel }) => (
  <Card className="gap-10 rounded-3xl border-x-0 border-t-0 p-6 pt-4">
    <CardHeader className="flex-col justify-between gap-6 space-y-0 p-0">
      <h3 className="font-semibold">Create new client</h3>
      <div className="flex items-center justify-between gap-2">
        <CurrencySelector />
        <div className="flex w-1/2 items-center space-x-2 px-4">
          <CustomCheckbox text="Default currency for this client" id="currency" />
        </div>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 px-0 py-4">
      <SearchNifSelector />
      <div className="flex flex-col gap-1">
        <CustomInput
          placeholder="Search client by NIF"
          // onInputHandler={(value) => form.setValue('invoice.additionalOptions.purchaseOrder', value)}
          onInputHandler={(value) => console.log(value)}
        />
        <p className="ml-4 text-sm text-dark-gray">*Client legal name required</p>
      </div>
      <div className="flex flex-col gap-1">
        <CustomInput placeholder="Client email" onInputHandler={(value) => console.log(value)} />
        <p className="ml-4 text-sm text-dark-gray">Use coma (,) to add more than one email.</p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="w-full border-none">
          <AccordionTrigger
            icon="plus"
            className="my-4 flex-none gap-1 rounded-full px-3 py-2 text-dark-blue transition-colors hover:text-dark-blue hover:no-underline"
          >
            Add additional details
          </AccordionTrigger>
          <AccordionContent className="my-4 flex flex-col gap-4 py-0">
            <CustomInput placeholder="Street address" onInputHandler={(value) => console.log(value)} />
            <CustomInput placeholder="City" onInputHandler={(value) => console.log(value)} />
            <div className="flex gap-4">
              <CustomInput
                placeholder="Postal code"
                onInputHandler={(value) => console.log(value)}
                wrapperClasses="w-1/2"
              />
              <CustomInput
                placeholder="Floor, door number"
                onInputHandler={(value) => console.log(value)}
                wrapperClasses="w-1/2"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
    <CardFooter className="justify-around px-0">
      {/* <div className="flex flex-col items-center justify-end gap-4 lg:flex-row"> */}
      <Button
        variant="ghost"
        type="button"
        className="rounded-full border-[1.5px] bg-white px-20 py-3.5 text-[#7E8081]"
        onClick={onCancel}
      >
        Save as draft
      </Button>
      <Button
        variant="ghost"
        type="button"
        className="rounded-full border-[1.5px] bg-foreground px-20 py-3.5 text-white disabled:bg-[#7E8081] disabled:text-white"
        onClick={onSubmit}
      >
        Issue invoice
      </Button>
      {/* </div> */}
    </CardFooter>
  </Card>
);
