import React from 'react';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Props = {
  sections: {
    label: string;
    value: string | JSX.Element;
  }[];
  classes?: string;
  align?: string;
};

export const InvoicePreviewLineSection: React.FC<Props> = ({ sections, classes, align = 'start' }) => (
  <div className={cn('flex justify-center border-b border-t border-dashed py-4 text-sm text-dark-gray', classes)}>
    {sections.map((section, index) => (
      <React.Fragment key={index}>
        <div className={cn('flex flex-col', `text-${align}`)}>
          <p>{section.label}</p>
          <p className="font-semibold">{section.value}</p>
        </div>
        {index < sections.length - 1 && <Separator orientation="vertical" className="mx-5 h-auto" />}
      </React.Fragment>
    ))}
  </div>
);
