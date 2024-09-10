import React from 'react';
import { useWatch } from 'react-hook-form';

import { Item } from '@/context/model';

import { AddItems } from './add-items';
import { AddedItem } from './added-item';

export const AddInvoiceSection = () => {
  const items: Item[] = useWatch({
    name: 'items',
  });
  return (
    <>
      <AddItems />
      {!!items &&
        items.map((item, index) => (
          <AddedItem
            key={`item-${item.id}-${Math.floor(Math.random() * 1000) + 1}`} // check again
            itemIndex={index}
            item={item}
          />
        ))}
    </>
  );
};
