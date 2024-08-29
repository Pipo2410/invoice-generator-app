'use client';
import Link from 'next/link';
import React from 'react';
import { IconComponent } from './icon-component';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

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
						'flex gap-[6px] py-3 pl-3 pr-5 rounded-xl hover:text-dark-blue hover:bg-light-blue group',
						path.startsWith(href)
							? 'bg-light-blue text-dark-blue'
							: 'text-dark-gray '
					)}
				>
					<IconComponent
						icon={icon}
						className={cn(
							'transition-colors',
							path.startsWith(href) ? 'fill-dark-blue' : 'fill-dark-gray',
							'group-hover:fill-dark-blue'
						)}
					/>
					<span className="flex items-center font-semibold text-sm">
						{children}
					</span>
				</Link>
			</li>
		</>
	);
};
