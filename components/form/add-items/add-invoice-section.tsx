import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { FormType } from '@/components/layout/content';
import { Items } from '@/context/model';

import { AddItems } from './add-items';
import { AddedItem } from './added-item';

type Props = {
  form: UseFormReturn<FormType>;
};

export const AddInvoiceSection: React.FC<Props> = ({ form }) => {
  const items: Items = useWatch({
    name: 'invoice.items',
  });
  return (
    <>
      <AddItems form={form} />
      {!!items &&
        items.map((item, index) => (
          <AddedItem
            key={`item-${item.name}-${Math.floor(Math.random() * 1000) + 1}`} // check again
            itemIndex={index}
            item={item}
            form={form}
          />
        ))}
    </>
  );
};
