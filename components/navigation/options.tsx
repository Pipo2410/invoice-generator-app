import Link from 'next/link';
import React from 'react';

import { languages } from '@/assets/languages';

import { IconComponent } from './icon-component';
import { LanguageSelector } from './language-selector';

export const Options = () => {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="flex items-center gap-1 font-semibold text-dark-blue">
        <IconComponent icon="contact" className="fill-dark-blue" />
        <span>Contact support</span>
      </Link>
      <LanguageSelector data={languages} />
    </div>
  );
};
