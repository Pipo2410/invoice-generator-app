import { useRef } from 'react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
  placeholder: string;
  onInputHandler: (value: string) => void;
};

export const CustomInput: React.FC<Props> = ({ placeholder, onInputHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Purchase order"
        className="peer h-fit rounded-2xl border-none bg-secondary px-3 py-4 pt-[30px] text-base leading-4 placeholder:text-base placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(event) => onInputHandler(event.target.value)}
      />
      <Label
        onClick={() => inputRef.current?.focus()}
        htmlFor="email"
        className="absolute flex -translate-y-11 translate-x-3 text-base font-normal text-dark-gray transition-all duration-300 hover:cursor-text peer-focus:-translate-y-14 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-14 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {placeholder}
      </Label>
    </div>
  );
};
// peer-[:not(:placeholder-shown)]:scale-75
// peer-focus:scale-75
