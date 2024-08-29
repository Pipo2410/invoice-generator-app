import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { randomItems } from './create-invoice-form';
import { Summary } from './summary';

export const Preview = () => {
	return (
		<Card className="w-full flex flex-col gap-4 px-4 pt-6 pb-8">
			<div className="flex flex-col gap-1 p-2">
				<div className="flex flex-col gap-1">
					<h3 className="font-semibold">Invoice</h3>
					<h4 className="text-xs text-dark-gray font-semibold">#123</h4>
				</div>
				<div className="flex flex-col py-4">
					<h5 className="font-semibold">Billed to</h5>
					<p className="flex justify-between text-dark-gray">
						<span>Business name</span>
						<span className="font-semibold">Jon Doe</span>
					</p>
					<p className="flex justify-between text-dark-gray">
						<span>Business address</span>
						<span>Business address</span>
					</p>
					<p className="flex justify-between text-dark-gray">
						<span>City, Country - 0000-000</span>
						<span>City, Country - 0000-000</span>
					</p>
					<p className="flex justify-between text-dark-gray">
						<span>NIF</span>
						<span>123451234</span>
					</p>
				</div>
				<div className="flex py-4 -mx-1 justify-center border-b border-t border-dotted">
					<div className="flex flex-col items-center">
						<p>Due date</p>
						<p className="font-semibold">Mar 2, 2023</p>
					</div>
					<Separator orientation="vertical" className="mx-5 h-auto" />
					<div className="flex flex-col items-center">
						<p>Note or PO</p>
						<p className="font-semibold">1234456 ref ABC</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-8">
				<p>Item</p>
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-6 gap-0.5 text-end text-xs">
						<span className="col-start-3 col-end-4">Unit price</span>
						<span className="col-start-4 col-end-5">Units</span>
						<span className="col-start-5 col-end-6">VAT</span>
						<span className="col-start-6 col-end-7">Total</span>
					</div>
					{randomItems.map((item) => {
						const formattedPrice = new Intl.NumberFormat('de-DE', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}).format(item.price);
						return (
							<div
								key={item.id}
								className="grid grid-cols-6 gap-0.5 text-end text-xs py-1"
							>
								<span className="col-start-1 col-end-3 text-start">
									{item.name}
								</span>
								<span className="col-start-3 col-end-4 bg-[#F9F9F9] rounded-sm p-1">
									{formattedPrice}
								</span>
								<span className="col-start-4 col-end-5 bg-[#F9F9F9] rounded-sm p-1">
									{item.quantity}
								</span>
								<span className="col-start-5 col-end-6 bg-[#F9F9F9] rounded-sm p-1">
									{item.VatOption} %
								</span>
								<span className="col-start-6 col-end-7 bg-[#F9F9F9] rounded-sm p-1">
									{formattedPrice} {item.currency}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<Summary />
		</Card>
	);
};
