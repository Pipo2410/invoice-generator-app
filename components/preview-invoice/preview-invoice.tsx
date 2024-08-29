import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Preview } from '@/components/create-invoice/preview';
import { Email } from '@/components/create-invoice/email';

export const PreviewInvoice = () => {
	return (
		<div className="col-span-full xl:col-span-5 mb-40">
			<Tabs defaultValue="preview" className="mx-6 sticky top-2">
				<TabsList className="bg-transparent h-fit w-full p-0">
					<TabsTrigger
						className="w-full rounded-none px-6 py-2 border-b border-transparent data-[state=active]:text-dark-blue data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-dark-blue hover:text-dark-blue hover:border-dark-blue"
						value="preview"
					>
						Preview
					</TabsTrigger>
					<TabsTrigger
						className="w-full rounded-none px-6 py-2 border-b border-transparent data-[state=active]:text-dark-blue data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-dark-blue hover:text-dark-blue hover:border-dark-blue"
						value="email"
					>
						Email
					</TabsTrigger>
				</TabsList>
				<TabsContent value="preview" className="mt-4">
					<Preview />
				</TabsContent>
				<TabsContent value="email" className="mt-4">
					<Email />
				</TabsContent>
			</Tabs>
		</div>
	);
};
