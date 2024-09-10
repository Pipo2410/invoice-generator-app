'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { PlusIcon, ZoomIn } from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Label } from '../ui/label';

export type AutocompleteItem<T extends string> = {
  value: T;
  label: string;
  id: string;
};

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: AutocompleteItem<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  inputClassNames?: string;
  searchWrapperClasses?: string;
  iconClassName?: string;
  error: boolean;
  addOption?: boolean;
  chooseValueBy?: 'value' | 'label';
  resetOnSelection?: boolean;
};

export const AutoComplete = <T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  // isLoading,
  // emptyMessage = 'No items.',
  placeholder = 'Search...',
  inputClassNames,
  searchWrapperClasses,
  iconClassName,
  error,
  addOption,
  chooseValueBy = 'value',
  resetOnSelection = false,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const inputWrapper = useRef<React.ElementRef<typeof CommandPrimitive>>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const labels = useMemo(
    () => items.reduce((acc, item) => ({ ...acc, [item.id]: item.label }), {} as Record<string, string>),
    [items],
  );

  const reset = () => {
    onSelectedValueChange('' as T);
    onSearchValueChange('');
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    inputWrapper.current?.classList.remove('!bg-light-blue', '!border-[#CCD7FF]');
    if (!e.relatedTarget?.hasAttribute('cmdk-list') && labels[selectedValue] !== searchValue) {
      reset();
    }
  };

  const handleSelectItem = (inputValue: string) => {
    inputRef.current?.blur();
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      resetOnSelection ? onSearchValueChange('') : onSearchValueChange(labels[inputValue] ?? '');
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command
          shouldFilter={false}
          ref={inputWrapper}
          className={cn('rounded-2xl border border-secondary', searchWrapperClasses, error && 'border-dark-orange')}
        >
          <PopoverAnchor asChild>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <div className={cn('relative flex items-center px-3')} cmdk-input-wrapper="">
              <ZoomIn className={cn('mr-2 h-4 w-4 shrink-0 opacity-50', iconClassName)} />
              <CommandPrimitive.Input
                asChild
                value={searchValue}
                onValueChange={onSearchValueChange}
                onKeyDown={(e) => setOpen(e.key !== 'Escape')}
                onMouseDown={() => setOpen((open) => !!searchValue || !open)}
                onFocus={() => {
                  inputWrapper.current?.classList.add('!bg-light-blue', '!border-[#CCD7FF]');
                  setOpen(true);
                }}
                onBlur={handleInputBlur}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={placeholder}
                  className={cn('bg-inherit', inputClassNames)}
                />
              </CommandPrimitive.Input>
              <Label
                onClick={() => inputRef.current?.focus()}
                htmlFor="email"
                className="absolute flex translate-x-9 text-base font-normal text-dark-gray transition-all duration-300 hover:cursor-text peer-focus:-translate-y-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {placeholder}
              </Label>
            </div>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList className="rounded-2xl">
              {searchValue && addOption && (
                <CommandItem
                  value="create-new"
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={handleSelectItem}
                  className="group flex-col items-start gap-3 rounded-none py-3 pl-4 data-[selected=true]:bg-[#F8F8F8]"
                >
                  <div className="flex items-center gap-2 p-0">
                    <p className="text-sm font-semibold text-dark-gray">{searchValue}</p>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="p-0 text-dark-blue hover:bg-transparent hover:text-dark-blue"
                    >
                      <PlusIcon className="w-4" />
                      <span>Create item</span>
                    </Button>
                  </div>
                </CommandItem>
              )}
              {/* {items.length > 0 && !isLoading ? ( */}
              {items.length > 0 ? (
                <CommandGroup className="p-0">
                  {items.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={() => handleSelectItem(option.id)}
                      className="group flex-col items-start gap-3 rounded-none py-2 pl-4 data-[selected=true]:bg-[#F8F8F8]"
                    >
                      <span className="text-md font-semibold group-hover:text-[#101010]">
                        {chooseValueBy === 'value' ? option.label : option.value}
                      </span>
                      <span className="text-xs group-hover:text-[#5A5858]">
                        {chooseValueBy === 'value' ? option.value : option.label}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
              {/* {!isLoading ? (
								<CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
							) : null} */}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
};
