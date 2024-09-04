import Link from 'next/link';

import { IconComponent } from '@/components/navigation/icon-component';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <div className="header flex flex-col gap-6">
      <Button size="icon" variant="ghost">
        <Link href="/invoices">
          <IconComponent icon="payments" className="h-10 w-6 rotate-180 fill-dark-gray" />
        </Link>
      </Button>
      <h1 className="text-3xl font-semibold">New invoice #123</h1>
    </div>
  );
};
