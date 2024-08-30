'use client';
import { useState } from 'react';
import { CreateInvoiceForm } from '@/components/create-invoice/create-invoice-form';
import { ActionBar } from '@/components/footer/action-bar';
import { cn } from '@/lib/utils';
import { PreviewInvoice } from '@/components/preview-invoice/preview-invoice';

export const Content = () => {
	const [showPreview, setShowPreview] = useState(true);
	return (
		<>
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
		</>
	);
};
