import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useCreateInvoiceFormContext } from '@/context/create-invoice-context';

export const ActionBar = () => {
	const { setShowPreview } = useCreateInvoiceFormContext();

	return (
		<div className="py-6 px-10 shadow-actionBar bg-background absolute w-screen bottom-0 -left-[285px]">
			<div className="flex gap-4 justify-end items-center">
				<Button
					variant="ghost"
					className="text-dark-blue hover:bg-transparent"
					onClick={() => setShowPreview((prev) => !prev)}
				>
					<Eye className="text-black mr-1" />
					Enable preview
				</Button>
				<Button
					variant="ghost"
					type="button"
					className="text-[#7E8081] bg-white px-20 py-3.5 border-[1.5px] rounded-full"
				>
					Save as draft
				</Button>
				<Button
					variant="ghost"
					type="submit"
					className="text-white bg-foreground px-20 py-3.5 border-[1.5px] rounded-full disabled:text-white disabled:bg-[#7E8081]"
				>
					Issue invoice
				</Button>
			</div>
		</div>
	);
};
