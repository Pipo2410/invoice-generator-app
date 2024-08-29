import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { CustomInput } from './custom-input';
import { CustomCheckbox } from './custom-checkbox';

export const AdditionalOptions = () => {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1" className="w-full">
				<AccordionTrigger className="flex-none py-2 px-3 my-4 gap-1 text-dark-blue hover:text-dark-blue data-[state=open]:bg-dark-blue data-[state=open]:text-white rounded-full transition-colors hover:no-underline">
					Additional options
				</AccordionTrigger>
				<AccordionContent className="py-0 m-6 flex flex-col gap-6">
					<div className="flex flex-col gap-6">
						<CustomCheckbox
							text="Include retention %"
							id="retention"
							inputType="input"
						/>
						<CustomCheckbox
							text="Apply global discount"
							id="discount"
							inputType="select"
						/>
					</div>
					<CustomInput placeholder="Reference note" />
					<CustomInput placeholder="Purchase order" />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
