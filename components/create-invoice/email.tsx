import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { PlusIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export const Email = () => {
	return (
		<Card className="flex flex-col gap-4 w-full px-4 pt-6 pb-24">
			<CardHeader className="p-2 space-y-0 gap-2">
				<div className="flex justify-between items-center border-b h-10">
					<p className="font-semibold">
						Sending to:
						<span className="text-[13px] font-normal ml-4">
							company.abc@email.com
						</span>
					</p>
					<Button
						type="button"
						size="icon"
						className="w-fit h-fit px-1 py-2 gap-1 bg-transparent text-dark-blue hover:bg-transparent"
					>
						<PlusIcon className="h-4 w-4" />
						<span className="text-xs">Cc</span>
					</Button>
				</div>
				<div className="flex items-center border-b h-10">
					<p className="font-semibold">
						Subject:
						<span className="text-[13px] font-normal ml-4">
							Jon Doe - Invoice #000, Due date on dd/mm/yyyy
						</span>
					</p>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col p-4 gap-4">
				<div className="flex flex-col rounded-md p-4">
					<p>Hi [client name],</p>
					<br />
					<p>Thank your for your business.</p>
					<br />
					<p>Here is your invoice [####] in the amount of [2.352,37€].</p>
					<br />
					<p>
						Please pay the invoice using the reference code bellow:
						[referencecode]
					</p>
				</div>
				<Textarea placeholder="Add a custom note here" />
				<div className="flex flex-col rounded-md p-4">
					<p>If you have any questions, please contact jondoe@email.com.</p>
					<br />
					<p>Thank you,</p>
					<br />
					<p>Jon Doe</p>
				</div>
			</CardContent>
		</Card>
	);
};
