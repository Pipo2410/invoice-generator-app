import React from 'react';
import { useWatch } from 'react-hook-form';

import { currencies } from '@/assets/currencies';

import { Separator } from '../ui/separator';

export const InvoiceSummary = () => {
  const vatExemption = useWatch({ name: 'invoice.vatExemption.label' });
  const currency = useWatch({ name: 'invoice.currency.value' });
  const currencySign = currencies.find((el) => el.value === currency)?.sign;

  return (
    <div className="flex flex-col gap-8 text-dark-gray">
      <h3 className="text-base font-semibold text-dark-gray">Summary</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Retention</p>
          <p className="text-foreground">-</p>
        </div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="text-foreground">1.250,00{currencySign}</p>
        </div>
        <div className="flex justify-between">
          <p>
            VAT <span className="font-bold">(23%)</span>
          </p>
          <p className="text-foreground">287,50{currencySign}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount</p>
          <p className="text-foreground">125,00{currencySign}</p>
        </div>
        <Separator />
      </div>

      <div className="flex justify-between">
        <p>Total</p>
        <p className="text-foreground">1.537,50{currencySign}</p>
      </div>
      <div className="flex justify-between">
        <p>VAT Exemption</p>
        <p className="text-foreground">{vatExemption}</p>
      </div>
    </div>
  );
};
