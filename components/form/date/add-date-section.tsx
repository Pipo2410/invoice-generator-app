import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType } from '@/utils/model';

import { DueDate } from './due-date-calendar';
import { IssueDate } from './issue-date';

type Props = {
  form: UseFormReturn<FormType>;
};

export const AddDateSection: React.FC<Props> = ({ form }) => (
  <div className="flex flex-col gap-4 md:flex-row">
    <IssueDate form={form} />
    <DueDate form={form} />
  </div>
);
