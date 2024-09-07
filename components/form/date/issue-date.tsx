'use client';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormType } from '@/context/model';
import { cn } from '@/lib/utils';

type Props = {
  form: UseFormReturn<FormType>;
  placeholder?: string;
};

export const IssueDate: React.FC<Props> = ({ form }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { issueDate } = form.getValues('invoice.date');
  const { errors } = form.formState;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            'group h-fit min-h-16 w-full justify-between rounded-2xl border border-secondary bg-secondary p-4 py-3 text-base font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border data-[state=open]:border-[#E2E2E2] data-[state=open]:bg-light-blue',
            errors.invoice?.date?.issueDate && 'border-dark-orange',
          )}
        >
          <div className="flex flex-col text-start">
            {issueDate ? (
              <>
                <span className="text-xs text-dark-gray">Issue date</span>
                <span className="leading-[22px]">{format(issueDate, 'PPP')}</span>
              </>
            ) : (
              <span>Select due date</span>
            )}
          </div>
          <ChevronDown className="relative top-[1px] h-6 w-6 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <FormField
          control={form.control}
          name="invoice.date.issueDate"
          render={({ field }) => (
            // console.log(field);
            <FormItem>
              <FormControl>
                <Calendar
                  mode="single"
                  // selected={dateNow}
                  selected={field.value}
                  onSelect={(value) => {
                    // setDate(value);
                    form.clearErrors('invoice.date.issueDate');
                    setIsOpen(false);
                    field.onChange(value);
                  }}
                  initialFocus
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  );
};
