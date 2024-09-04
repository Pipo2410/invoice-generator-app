'use client';

import React, { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';

type Props = {
  text: string;
  id: string;
  inputType: 'input' | 'select';
};

export const CustomCheckbox: React.FC<Props> = ({ text, id, inputType }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const valueElement =
    inputType === 'input' ? (
      <Input className="w-fit rounded-lg border-none bg-secondary px-2 py-1 text-[#101010] ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
    ) : (
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
    );
  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          className="data-[state=checked]:border-dark-blue data-[state=checked]:bg-dark-blue"
          checked={isChecked}
          onCheckedChange={onCheck}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {text}
        </label>
      </div>
      {isChecked && valueElement}
    </>
  );
};
