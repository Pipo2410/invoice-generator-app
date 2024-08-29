'use client';
import React from 'react';
import { IconComponent } from '../navigation/icon-component';

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const UserNavigation = () => {
	return (
		<>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger className="gap-1">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn." />
							<AvatarFallback>TW</AvatarFallback>
						</Avatar>
						The Winter Coffee
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
				<MenubarMenu>
					<MenubarTrigger className="gap-1" icon={false}>
						<IconComponent icon="settings" className="fill-black" />
					</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Settings</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Log out</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger className="gap-1" icon={false}>
						<div className="relative">
							<IconComponent icon="notification" className="fill-black" />
							<span className="absolute -top-1 left-3 flex w-4 h-4 justify-center items-center rounded-full text-[10px] bg-[#EB4E23] text-white">
								9
							</span>
						</div>
					</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New message from Rauva</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>New message from Rauva</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</>
	);
};
