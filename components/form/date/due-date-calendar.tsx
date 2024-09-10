'use client';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormType } from '@/context/model';
import { cn } from '@/lib/utils';

const daysOptions = [15, 30, 45, 60, 90];

type Props = {
  form: UseFormReturn<FormType>;
};

export const DueDate: React.FC<Props> = ({ form }) => {
  const [days, setDays] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // const { dueDate, issueDate } = form.watch('date'); // Use watch for reactive form updates
  const { dueDate, issueDate } = form.getValues('date');
  const { errors } = form.formState;

  // Calculate due date based on selected days and issueDate
  const calculateDueDate = (days: number) => {
    if (!issueDate) {
      form.trigger('date.issueDate'); // Ensure issueDate is set before calculation
      return;
    }

    const newDueDate = new Date(issueDate);
    newDueDate.setDate(issueDate.getDate() + days);

    setDays(days);
    form.setValue('date.dueDate', newDueDate);
    form.clearErrors('date.dueDate');
  };

  // Handle custom date selection
  const handleCustomDateSelect = (date: Date | undefined) => {
    setDays(null); // Reset days when selecting a custom date

    if (!date) {
      form.resetField('date.dueDate');
    } else {
      form.setValue('date.dueDate', date);
    }
    form.clearErrors('date.dueDate');
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'group h-fit min-h-16 w-full justify-between rounded-xl border border-secondary bg-secondary p-4 py-3 text-base font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0',
            errors.date?.dueDate && 'border-dark-orange',
          )}
        >
          <div className="flex flex-col text-start font-normal">
            {dueDate ? (
              <>
                <span className="text-xs text-dark-gray">Due date</span>
                <span className="text-base font-normal leading-[22px]">
                  {days ? `${days} days (${format(dueDate, 'PPP')})` : format(dueDate, 'PPP')}
                </span>
              </>
            ) : (
              <span>Select due date</span>
            )}
          </div>
          <ChevronDown className="relative top-[1px] h-6 w-6 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] p-4">
        {daysOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => calculateDueDate(option)}
            className="border-b px-2 py-4 text-[15px]"
          >
            <span>{option} days</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="px-2 py-4">
            <span>Choose custom date</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="ml-6 p-2">
              <FormField
                control={form.control}
                name="date.dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Calendar mode="single" selected={field.value} onSelect={handleCustomDateSelect} initialFocus />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
