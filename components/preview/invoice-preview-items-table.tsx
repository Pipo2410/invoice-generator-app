import React from 'react';

import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/helpers';
import { Item } from '@/utils/model';

type Props = {
  items: Item[];
  currency: { value: string };
  wrapperClasses?: string;
};

export const InvoicePreviewItemsTable: React.FC<Props> = ({ items, currency, wrapperClasses }) => (
  <div className={cn('flex flex-col gap-8 py-4', wrapperClasses)}>
    <p className="text-sm font-semibold text-light-gray">Item</p>
    <div className="flex flex-col gap-2">
      <table className="w-full table-auto border-separate border-spacing-2 text-xs">
        <thead className="font-semibold text-light-gray">
          <tr>
            <th className="w-[40%]"></th>
            <th>Unit price</th>
            <th>Units</th>
            <th>VAT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items.map((item) => {
              const formattedPrice = formatPrice(item.price, currency.value);
              return (
                <tr key={item.id} className="rounded-sm p-1 text-center text-foreground">
                  <td className="rounded-none text-start">{item.name}</td>
                  <td className="bg-background">{formattedPrice}</td>
                  <td className="bg-background">{item.unit}</td>
                  <td className="bg-background">{item.vat} %</td>

                  <td className="bg-background">{formatPrice(item.totalPrice ?? 0, currency.value)}</td>
                </tr>
              );
            })
          ) : (
            <tr className="rounded-sm p-1 text-center text-foreground">
              <td></td>
              <td className="bg-background">0</td>
              <td className="bg-background">0</td>
              <td className="bg-background">0</td>
              <td className="bg-background">0</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
