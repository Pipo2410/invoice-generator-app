import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

import { FormType, Item } from '@/context/model';

import { AddItems } from './add-items';
import { AddedItem } from './added-item';

type Props = {
  form: UseFormReturn<FormType>;
};

export const AddInvoiceSection: React.FC<Props> = ({ form }) => {
  const { append, remove, fields } = useFieldArray({
    name: 'items',
  });

  return (
    <>
      <AddItems form={form} appendFunction={append} />
      {!!fields.length &&
        fields.map((item, index) => (
          <AddedItem
            itemIndex={index}
            key={item.id} // check again
            item={item as Item} // fix this
            onRemoveItem={remove}
          />
        ))}
    </>
  );
};
