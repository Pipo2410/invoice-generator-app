import React from 'react';

type Props = {
	children: React.ReactNode;
	category?: string;
};

export const NavigationItemGroup: React.FC<Props> = ({
	children,
	category,
}) => (
	<div className={`${category && 'mt-6'}`}>
		{category && (
			<span className="text-dark-gray capitalize font-semibold text-xs leading-[18px] block mb-1">
				{category}
			</span>
		)}
		<div className="bg-white rounded-2xl">{children}</div>
	</div>
);
