'use client';

import React, { useState } from 'react';

import { Checkbox } from '../ui/checkbox';

type Props = {
  text: string;
  id: string;
  children?: React.ReactNode;
};

export const CustomCheckbox: React.FC<Props> = ({ text, id, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onCheck = () => {
    setIsChecked((prev) => !prev);
  };
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
      {isChecked && children}
    </>
  );
};
