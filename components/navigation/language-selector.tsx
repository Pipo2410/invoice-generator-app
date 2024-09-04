'use client';

import { Check, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { IconComponent } from './icon-component';

type Props = {
  data: {
    value: string;
    label: string;
    icon: string;
  }[];
};

export const LanguageSelector: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data[0].value);

  const icon = data.find((framework) => framework.value === value)?.icon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="group w-fit justify-start gap-1 p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <IconComponent icon={icon ?? data[0].icon} className="h-5 w-5 fill-dark-gray" />
          {value ? data.find((framework) => framework.value === value)?.label : data[0].label}
          <ChevronDown className="relative top-[1px] ml-1 h-5 w-5 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit rounded-3xl p-0">
        <Command className="rounded-3xl">
          <CommandInput
            searchWrapperClasses="bg-secondary"
            iconClassName="mr-3 h-4 w-4"
            placeholder="Search country..."
          />
          <CommandList>
            <CommandEmpty>Language not found.</CommandEmpty>
            <CommandGroup className="p-0">
              {data.map((framework) => (
                <CommandItem
                  className="gap-3 py-2 pl-4 data-[selected=true]:bg-light-blue"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2.5 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  <div className="flex gap-2">
                    <IconComponent icon={framework.icon} className="h-5 w-5 fill-dark-gray" />
                    {framework.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
