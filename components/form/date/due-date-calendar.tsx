'use client';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import { FormType } from '@/components/layout/content';
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
import { cn } from '@/lib/utils';

const options = [15, 30, 45, 60, 90];

type Props = {
  form: UseFormReturn<FormType>;
};

export const DueDate: React.FC<Props> = ({ form }) => {
  const [days, setDays] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { dueDate, issueDate } = form.getValues('invoice.date');

  const { errors } = form.formState;

  const calculateDueDate = (days: number, field: ControllerRenderProps<FormType>) => {
    const newDueDate = new Date();

    if (issueDate) {
      newDueDate.setDate(issueDate.getDate() + days);
    } else {
      form.trigger('invoice.date.issueDate');
      return;
    }
    setDays(days);
    field.onChange(newDueDate);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'group h-fit min-h-16 w-full justify-between rounded-xl border border-secondary bg-secondary p-4 py-3 text-base font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border data-[state=open]:border-[#E2E2E2] data-[state=open]:bg-light-blue',
            errors.invoice?.date?.dueDate && 'border-dark-orange',
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
        {options.map((option) => (
          <FormField
            key={option}
            control={form.control}
            name="invoice.date.dueDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropdownMenuItem
                    onSelect={() => calculateDueDate(option, field)}
                    className="border-b px-2 py-4 text-[15px]"
                  >
                    <span>{option} days</span>
                  </DropdownMenuItem>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="px-2 py-4">
            <span>Choose custom date</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="ml-6">
              <FormField
                control={form.control}
                name="invoice.date.dueDate"
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <FormItem>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(value) => {
                            setIsOpen(false);
                            setDays(null);
                            field.onChange(value);
                          }}
                          initialFocus
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
