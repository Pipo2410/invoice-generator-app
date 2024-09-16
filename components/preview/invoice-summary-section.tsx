import React from 'react';

import { Separator } from '../ui/separator';

type SummaryItem = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  items: SummaryItem[];
  totalLabel: string;
  totalValue: string;
  vatExemptionLabel?: string;
  vatExemptionValue?: string;
  showSeparator?: boolean;
};

export const InvoiceSummarySection: React.FC<Props> = ({
  title,
  items,
  totalLabel,
  totalValue,
  vatExemptionLabel,
  vatExemptionValue,
  showSeparator = false,
}) => (
  <div className="flex flex-col gap-8 text-dark-gray">
    <h3 className="text-base font-semibold text-dark-gray">{title}</h3>
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between">
          <p>{item.label}</p>
          <p className="text-foreground">{item.value}</p>
        </div>
      ))}
      {showSeparator && <Separator />}
    </div>
    <div className="flex justify-between">
      <p className="text-base font-semibold text-foreground">{totalLabel}</p>
      <p className="text-foreground">{totalValue}</p>
    </div>
    {vatExemptionLabel && vatExemptionValue && (
      <div className="flex justify-between">
        <p>{vatExemptionLabel}</p>
        <p className="text-foreground">{vatExemptionValue}</p>
      </div>
    )}
  </div>
);
