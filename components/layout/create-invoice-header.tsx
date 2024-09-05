import Link from 'next/link';

import { IconComponent } from '@/components/navigation/icon-component';
import { Button } from '@/components/ui/button';

type Props = {
  invoiceNumber: number;
};

export const Header: React.FC<Props> = ({ invoiceNumber }) => {
  return (
    <div className="header flex flex-col gap-6">
      <Button size="icon" variant="ghost">
        <Link href="/invoices">
          <IconComponent icon="payments" className="h-10 w-6 rotate-180 fill-dark-gray" />
        </Link>
      </Button>
      <h1 className="text-3xl font-semibold">New invoice #{invoiceNumber}</h1>
    </div>
  );
};
