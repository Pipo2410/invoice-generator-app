import React from 'react';
import { Navigation } from './navigation';
import { Options } from './options';

export const Sidebar = () => {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col gap-20 sticky top-2">
				<Navigation />
				<Options />
			</div>
		</div>
	);
};
