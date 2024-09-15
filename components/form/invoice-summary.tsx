import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { formatPrice } from '@/context/helpers';
import { FormType } from '@/context/model';
import { useCalculatePrice } from '@/hooks/use-calculate-price';

import { Separator } from '../ui/separator';

type Props = {
  form: UseFormReturn<FormType>;
};

export const InvoiceSummary: React.FC<Props> = ({ form }) => {
  const { control } = form;
  const vatExemption = useWatch({ control, name: 'vatExemption.label' });
  const currency = useWatch({ control, name: 'currency.value' });

  const { subTotal, vatTotal, discountTotal, retentionAmount, total } = useCalculatePrice();

  return (
    <div className="flex flex-col gap-8 text-dark-gray">
      <h3 className="text-base font-semibold text-dark-gray">Summary</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Retention</p>
          <p className="text-foreground">{formatPrice(retentionAmount, currency)}</p>
        </div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="text-foreground">{formatPrice(subTotal, currency)}</p>
        </div>
        <div className="flex justify-between">
          <p>VAT</p>
          <p className="text-foreground">{formatPrice(vatTotal, currency)}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount</p>
          <p className="text-foreground">{formatPrice(discountTotal, currency)}</p>
        </div>
        <Separator />
      </div>

      <div className="flex justify-between">
        <p>Total</p>
        <p className="text-foreground">{formatPrice(total, currency)}</p>
      </div>
      <div className="flex justify-between">
        <p>VAT Exemption</p>
        <p className="text-foreground">{vatExemption}</p>
      </div>
    </div>
  );
};
