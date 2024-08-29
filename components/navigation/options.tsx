import Link from 'next/link';
import React from 'react';
import { IconComponent } from './icon-component';

import { LanguageSelector } from './language-selector';
import { languages } from '@/assets/languages';

export const Options = () => {
	return (
		<div className="flex flex-col gap-6">
			<Link
				href="/"
				className="flex gap-1 text-dark-blue font-semibold items-center"
			>
				<IconComponent icon="contact" className="fill-dark-blue" />
				<span>Contact support</span>
			</Link>
			<LanguageSelector data={languages} />
		</div>
	);
};
