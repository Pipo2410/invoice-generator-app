import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SearchNifSelector } from './search-nif-selector';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export const CreateClient: React.FC<Props> = ({ onSubmit, onCancel }) => (
  <Card className="gap-10 border-x-0 border-t-0 p-6 pt-4">
    <CardHeader className="flex-col justify-between gap-6 space-y-0 p-0">
      <h3 className="font-semibold">Create new client</h3>
      <div className="flex items-center justify-between gap-2">
        {/* <CurrencySelector /> */}
        <Select>
          <SelectTrigger className="w-1/2">
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
        <div className="flex w-1/2 items-center space-x-2 px-4">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Default currency for this client
          </label>
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
    <CardContent className="px-0 py-4">
      <SearchNifSelector />
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
        className="rounded-full border-[1.5px] bg-foreground px-20 py-3.5 text-white disabled:bg-[#7E8081] disabled:text-white"
        onClick={onSubmit}
      >
        Issue invoice
      </Button>
      {/* </div> */}
    </CardFooter>
  </Card>
);
