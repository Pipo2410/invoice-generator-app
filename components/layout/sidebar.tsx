import React from 'react';
import { Options } from '@/components/navigation/options';
import { Navigation } from '@/components/navigation/navigation';

export const Sidebar = () => {
	return (
		<div className="hidden md:flex flex-col gap-10">
			<div className="flex flex-col gap-20 sticky top-2">
				<Navigation />
				<Options />
			</div>
		</div>
	);
};
