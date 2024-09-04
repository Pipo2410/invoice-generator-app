import React from 'react';

import { Navigation } from '@/components/navigation/navigation';
import { Options } from '@/components/navigation/options';

export const Sidebar = () => {
  return (
    <div className="hidden flex-col gap-10 md:flex">
      <div className="sticky top-2 flex flex-col gap-20">
        <Navigation />
        <Options />
      </div>
    </div>
  );
};
