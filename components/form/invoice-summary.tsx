import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { useCalculatePrice } from '@/hooks/use-calculate-price';
import { formatPrice } from '@/utils/helpers';
import { FormType } from '@/utils/model';

import { InvoiceSummarySection } from '../preview/invoice-summary-section';

type Props = {
  form: UseFormReturn<FormType>;
};

export const InvoiceSummary: React.FC<Props> = ({ form }) => {
  const { control } = form;
  const vatExemption = useWatch({ control, name: 'vatExemption.label' });
  const currency = useWatch({ control, name: 'currency.value' });

  const { subTotal, vatTotal, discountTotal, retentionAmount, total } = useCalculatePrice();

  return (
    <>
      <InvoiceSummarySection
        title="Summary"
        items={[
          {
            label: 'Retention',
            value: formatPrice(retentionAmount, currency),
          },
          {
            label: 'Subtotal',
            value: formatPrice(subTotal, currency),
          },
          {
            label: 'VAT',
            value: formatPrice(vatTotal, currency),
          },
          {
            label: 'Discount',
            value: formatPrice(discountTotal, currency),
          },
        ]}
        totalLabel="Total"
        totalValue={formatPrice(total, currency)}
        vatExemptionLabel="VAT Exemption"
        vatExemptionValue={vatExemption}
        showSeparator={true}
      />
    </>
  );
};
