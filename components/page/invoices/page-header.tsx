import Link from 'next/link';
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { IconComponent } from '@/components/navigation/icon-component';

const tabs = [
	'Overview',
	'Invoices',
	'Inoivce templates',
	'Clients',
	'Items',
	'Settings',
];

export const PageHeader = () => {
	return (
		<div className="w-fit flex flex-col gap-10">
			<div className="flex justify-between">
				<h1 className="text-3xl">Invoices</h1>

				<div className="flex gap-4 items-center">
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger className="text-dark-blue font-semibold items-center gap-1 focus:text-dark-blue focus:bg-transparent data-[state=open]:text-dark-blue data-[state=open]:bg-transparent">
								Other documents
							</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									Profile <MenubarShortcut>⌘T</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>Invoices</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>Share</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>Print</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
					<Link
						className="bg-dark-blue rounded-full px-16 py-3 text-white gap-1 flex items-center"
						href={'/invoices/create'}
					>
						<span className="text-base">Create invoice</span>
						<IconComponent icon="add" className="fill-white inline" />
					</Link>
				</div>
			</div>
			<Tabs defaultValue={tabs[1]}>
				<TabsList className="bg-white gap-4 rounded-full h-fit p-0.5">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab}
							className="rounded-full px-6 py-2 data-[state=active]:bg-light-blue data-[state=active]:text-dark-blue data-[state=active]:font-semibold data-[state=active]:shadow-none hover:bg-light-blue hover:text-dark-blue hover:font-semibold"
							value={tab}
						>
							{tab}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value={tabs[1]}>Here will be the table</TabsContent>
			</Tabs>
		</div>
	);
};
