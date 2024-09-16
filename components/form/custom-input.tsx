import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
  value: string;
  placeholder: string;
  type: string;
  id: string;
  wrapperClasses?: string;
  error?: boolean;
  onInputHandler: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export const CustomInput: React.FC<Props> = ({
  placeholder,
  wrapperClasses,
  value,
  error,
  type,
  id,
  onInputHandler,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  // Sync local state with parent value when it changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle changes locally, but don't notify parent yet
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // On blur, update parent state
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onInputHandler(event.target.value); // Notify parent of the final value
    if (onBlur) onBlur(event); // Optional additional blur handler
  };

  return (
    <div className={cn('relative', wrapperClasses)}>
      <Input
        ref={inputRef}
        type={type}
        id={id}
        value={inputValue}
        error={error}
        placeholder={placeholder}
        className="peer h-fit rounded-2xl border-transparent bg-secondary px-3 py-4 pt-[30px] text-base leading-4 placeholder:text-base placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={inputHandler}
        onBlur={handleBlur}
      />
      <Label
        onClick={() => inputRef.current?.focus()}
        htmlFor={id}
        className="absolute flex -translate-y-11 translate-x-3 text-base font-normal text-dark-gray transition-all duration-300 hover:cursor-text peer-focus:-translate-y-14 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-14 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {placeholder}
      </Label>
    </div>
  );
};
