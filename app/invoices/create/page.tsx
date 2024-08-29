'use client';
import { IconComponent } from '@/components/navigation/icon-component';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';

import { CreateInvoiceForm } from '@/components/create-invoice/create-invoice-form';
import { ActionBar } from '@/components/footer/action-bar';
import { cn } from '@/lib/utils';
import { PreviewInvoice } from '@/components/preview-invoice/preview-invoice';

const CreateInvoicePage = () => {
	const [showPreview, setShowPreview] = useState(true);
	return (
		<>
			<main className="w-full h-fit flex flex-col gap-10 ml-24 relative">
				<div className="header flex flex-col gap-6">
					<Button size="icon" variant="ghost">
						<Link href="/invoices">
							<IconComponent
								icon="payments"
								className="fill-dark-gray rotate-180 h-10 w-6"
							/>
						</Link>
					</Button>
					<h1 className="text-3xl font-semibold">New invoice #123</h1>
				</div>
				<div className="grid grid-cols-12 gap-[75px]">
					<div
						className={cn(
							showPreview ? 'col-span-full xl:col-span-7' : 'col-span-10'
						)}
					>
						<CreateInvoiceForm />
					</div>
					{showPreview && <PreviewInvoice />}
				</div>
				<ActionBar setShowPreview={setShowPreview} />
			</main>
		</>
	);
};

export default CreateInvoicePage;
