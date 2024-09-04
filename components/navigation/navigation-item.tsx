'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import { IconComponent } from './icon-component';

type Props = {
  children: React.ReactNode;
  icon: string;
  href: string;
};

export const NavigationItem: React.FC<Props> = ({ children, icon, href }) => {
  const path = usePathname();
  return (
    <>
      <li className="p-1">
        <Link
          href={href}
          className={cn(
            'group flex gap-[6px] rounded-xl py-3 pl-3 pr-5 hover:bg-light-blue hover:text-dark-blue',
            path.startsWith(href) ? 'bg-light-blue text-dark-blue' : 'text-dark-gray',
          )}
        >
          <IconComponent
            icon={icon}
            className={cn(
              'transition-colors',
              path.startsWith(href) ? 'fill-dark-blue' : 'fill-dark-gray',
              'group-hover:fill-dark-blue',
            )}
          />
          <span className="flex items-center text-sm font-semibold">{children}</span>
        </Link>
      </li>
    </>
  );
};
